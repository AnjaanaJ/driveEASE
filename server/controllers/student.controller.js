const Student = require("../models/Student");
const Course = require("../models/Course");

// Helper: generates a unique, human-readable Student ID like STU_2601
// Format: STU_<2-digit year><2-digit sequence number>
const generateStudentId = async () => {
  const year = new Date().getFullYear().toString().slice(-2); // e.g. 2026 -> "26"
  const prefix = `STU_${year}`;

  // Find all students whose ID already starts with this year's prefix,
  // then work out the highest sequence number used so far. This is
  // safer than counting documents, because it still works correctly
  // even if a student was deleted or an ID was set manually.
  const studentsThisYear = await Student.find({
    studentId: { $regex: `^${prefix}` },
  }).select("studentId");

  let maxSeq = 0;
  studentsThisYear.forEach((s) => {
    const seqPart = s.studentId.slice(prefix.length); // e.g. "STU_2601" -> "01"
    const seqNum = parseInt(seqPart, 10);
    if (!isNaN(seqNum) && seqNum > maxSeq) {
      maxSeq = seqNum;
    }
  });

  const nextNumber = (maxSeq + 1).toString().padStart(2, "0"); // e.g. 4 -> "04"
  return `${prefix}${nextNumber}`;
};

// Create a new student profile
// POST /api/students
const createStudent = async (req, res) => {
  try {
    const { nic, phone, address, coursePackage, preferredVehicleType, preferredTransmission } = req.body;

    // 1. Decide which userId this student profile belongs to.
    //    - Normal users (students) can ONLY create a profile for themselves.
    //      We ignore anything they send in req.body.userId and use their
    //      own token id instead — this stops someone from creating a
    //      profile under someone else's account.
    //    - Admins are allowed to create a profile on behalf of another
    //      user by passing userId in the body.
    let userId = req.user.id;
    if (req.user.role === "admin" && req.body.userId) {
      userId = req.body.userId;
    }
    // If no course package was selected, the dropdown sends an empty
    // string "" instead of leaving it out. Convert that to undefined
    // so Mongoose just skips the field instead of trying to cast ""
    // to an ObjectId (which throws a CastError).
    const cleanCoursePackage = coursePackage && coursePackage.trim() !== ""
      ? coursePackage
      : undefined;

    const cleanPreferredVehicleType = preferredVehicleType || undefined;
    const cleanPreferredTransmission = preferredTransmission || undefined;

    // 1a. Required fields check
    if (!userId || !nic || !phone) {
      return res
        .status(400)
        .json({ message: "Please provide userId, nic and phone" });
    }
    // 2b. NIC format validation (Sri Lanka format)
    const nicRegex = /^([0-9]{9}[vVxX]|[0-9]{12})$/;
    if (!nicRegex.test(nic)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid NIC number" });
    }
    if (
      cleanPreferredVehicleType &&
      !["Car", "Bike"].includes(cleanPreferredVehicleType)
    ) {
      return res.status(400).json({ message: "Invalid preferred vehicle type" });
    }
    if (
      cleanPreferredVehicleType === "Car" &&
      !["Manual", "Automatic"].includes(cleanPreferredTransmission)
    ) {
      return res.status(400).json({ message: "Please select a transmission for the car" });
    }

    // 2. Check NIC already exists
    const existingStudent = await Student.findOne({ nic });
    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "A student with this NIC already exists" });
    }
    // 2c. Phone number format validation (Sri Lanka format: 07XXXXXXXX)
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be a valid 10-digit number starting with 0",
      });
    }
    // 2d. Check the coursePackage is available
    if (cleanCoursePackage) {
      const courseExists = await Course.findById(cleanCoursePackage);
      if (!courseExists) {
        return res
          .status(400)
          .json({ message: "Invalid course package selected" });
      }
    }

    // 3. Create a Student
    const student = await Student.create({
      userId,
      nic,
      phone,
      address,
      coursePackage: cleanCoursePackage,
      preferredVehicleType: cleanPreferredVehicleType,
      preferredTransmission: cleanPreferredVehicleType === "Car" ? cleanPreferredTransmission : undefined,
    });

    res
      .status(201)
      .json({ message: "Student profile created successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all students (admin only) - searchable and filterable
// GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const { search, status, course } = req.query;

    // Build the base query using fields that live directly on the
    // Student document (status, coursePackage). These can be filtered
    // efficiently at the database level.
    let query = {};
    if (status) query.status = status;
    if (course) query.coursePackage = course;

    let students = await Student.find(query)
      .populate("userId", "name email")
      .populate("coursePackage", "name type price");

    // "search" can match nic, phone (on Student) OR name, email
    // (on the populated User). Since name/email only exist after
    // populate, we filter in JavaScript after fetching.
    if (search) {
      const term = search.toLowerCase();
      students = students.filter((student) => {
        const nicMatch = student.nic?.toLowerCase().includes(term);
        const phoneMatch = student.phone?.toLowerCase().includes(term);
        const nameMatch = student.userId?.name?.toLowerCase().includes(term);
        const emailMatch = student.userId?.email?.toLowerCase().includes(term);
        return nicMatch || phoneMatch || nameMatch || emailMatch;
      });
    }

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single student by id
// GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await req.student.populate([
      { path: "userId", select: "name email" },
      { path: "coursePackage", select: "name type price" },
      { path: "assignedInstructor", select: "name" },
    ]);

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a student profile
// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = req.student;

    const { phone, address, coursePackage, assignedInstructor, preferredVehicleType, preferredTransmission, studentId } = req.body;

    // Only admins can manually set/change a student's studentId.
    // This is mainly used for backfilling IDs on old students that
    // were approved before the auto-ID feature existed.
    if (studentId !== undefined) {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Only admins can set a student ID",
        });
      }
      student.studentId = studentId;
    }

    // Phone format validation (only if they're actually changing it)
    if (phone) {
      const phoneRegex = /^0[0-9]{9}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          message:
            "Phone number must be a valid 10-digit number starting with 0",
        });
      }
      student.phone = phone;
    }

    if (address) student.address = address;

    if (preferredVehicleType !== undefined) {
      if (!["Car", "Bike"].includes(preferredVehicleType)) {
        return res.status(400).json({ message: "Invalid preferred vehicle type" });
      }
      if (
        preferredVehicleType === "Car" &&
        !["Manual", "Automatic"].includes(preferredTransmission)
      ) {
        return res.status(400).json({ message: "Please select a transmission for the car" });
      }
      student.preferredVehicleType = preferredVehicleType;
      student.preferredTransmission = preferredVehicleType === "Car" ? preferredTransmission : undefined;
    }

    // Course exists validation (only if they're actually changing it)
    if (coursePackage) {
      const courseExists = await Course.findById(coursePackage);
      if (!courseExists) {
        return res
          .status(400)
          .json({ message: "Invalid course package selected" });
      }
      student.coursePackage = coursePackage;
    }

    // Only admins can assign an instructor to a student
if (assignedInstructor !== undefined) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Only admins can assign an instructor",
    });
  }

  const Instructor = require("../models/Instructor");

  const instructorExists = await Instructor.findById(assignedInstructor);

  if (!instructorExists) {
    return res.status(400).json({
      message: "Invalid instructor selected",
    });
  }

  student.assignedInstructor = assignedInstructor;
}

    await student.save();

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a student (admin only)
// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.deleteOne();

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Get attendance records for a student
// GET /api/students/:id/attendance
const getAttendance = async (req, res) => {
  try {
    res.status(200).json(req.student.attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Log/update attendance for a student
// PUT /api/students/:id/attendance
const updateAttendance = async (req, res) => {
  try {
    const { date, present } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Please provide a date" });
    }

    const student = req.student;

    student.attendance.push({
      date,
      present: present !== undefined ? present : true,
    });

    await student.save();

    res.status(200).json({
      message: "Attendance logged successfully",
      attendance: student.attendance,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Upload a document for a student
// POST /api/students/:id/documents
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const student = req.student;

    student.documents.push({
      fileName: req.file.originalname,
      fileUrl: `/uploads/${req.file.filename}`,
    });
    await student.save();

    res.status(201).json({
      message: "Document uploaded successfully",
      documents: student.documents,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Approve a student profile (admin only)
// PUT /api/students/:id/approve
const approveStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.status = "Approved";

    // Only generate a new ID if this student doesn't already have one.
    // Prevents wasting sequence numbers if a student is rejected then re-approved.
    if (!student.studentId) {
      student.studentId = await generateStudentId();
    }

    await student.save();

    res.status(200).json({
      message: "Student approved successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reject a student profile (admin only)
// PUT /api/students/:id/reject
const rejectStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.status = "Rejected";
    await student.save();

    res.status(200).json({ message: "Student rejected successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get student profile by userId (for logged-in student to see their own profile)
// GET /api/students/me/:userId
const getStudentByUserId = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const isOwner = req.params.userId === req.user.id;

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: "Access denied: this is not your profile" });
    }

    const student = await Student.findOne({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("coursePackage", "name type price")
      .populate("assignedInstructor", "name");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getAttendance,
  updateAttendance,
  uploadDocument,
  approveStudent,
  rejectStudent,
  getStudentByUserId,
};
