const Instructor = require("../models/Instructor");
const Student = require("../models/Student");

// Create Instructor
const createInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Instructor created successfully",
      data: instructor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Instructors
const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find()
    .populate("user", "name email role");

    res.status(200).json({
      success: true,
      count: instructors.length,
      data: instructors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Instructor By ID
const getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged-in Instructor
const getMyInstructorProfile = async (req, res) => {
  try {
    const instructor = await Instructor.findOne({
      user: req.user.id,
    });

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Instructor
const updateInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Instructor updated successfully",
      data: instructor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Instructor
const deleteInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndDelete(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Instructor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getInstructorAvailability = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: instructor.availability,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateInstructorAvailability = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const availability = req.body.availability;

    // Check that availability is an array
    if (!Array.isArray(availability)) {
      return res.status(400).json({
        success: false,
        message: "Availability must be an array",
      });
    }

    // Convert HH:MM time into minutes
    const timeToMinutes = (time) => {
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    // Validate each availability slot
    for (const slot of availability) {
      if (!slot.day || !slot.startTime || !slot.endTime) {
        return res.status(400).json({
          success: false,
          message: "Each availability slot must have day, startTime and endTime",
        });
      }

      const start = timeToMinutes(slot.startTime);
      const end = timeToMinutes(slot.endTime);

      // End time must be after start time
      if (start >= end) {
        return res.status(400).json({
          success: false,
          message: `Invalid time slot for ${slot.day}: end time must be after start time`,
        });
      }
    }

    // Check for overlapping slots on the same day
    for (let i = 0; i < availability.length; i++) {
      for (let j = i + 1; j < availability.length; j++) {
        const slotA = availability[i];
        const slotB = availability[j];

        // Only compare slots on the same day
        if (slotA.day !== slotB.day) {
          continue;
        }

        const startA = timeToMinutes(slotA.startTime);
        const endA = timeToMinutes(slotA.endTime);

        const startB = timeToMinutes(slotB.startTime);
        const endB = timeToMinutes(slotB.endTime);

        // Check if the two slots overlap
        if (startA < endB && endA > startB) {
          return res.status(400).json({
            success: false,
            message: `Availability slots overlap on ${slotA.day}: ${slotA.startTime}-${slotA.endTime} and ${slotB.startTime}-${slotB.endTime}`,
          });
        }
      }
    }

    // Save only after all validation passes
    instructor.availability = availability;

    await instructor.save();

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Students Assigned to an Instructor
const getInstructorStudents = async (req, res) => {
  try {
    const students = await Student.find({
      assignedInstructor: req.params.id,
    }).populate("userId", "name email");

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Instructor Performance
const getInstructorPerformance = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    const students = await Student.find({
      assignedInstructor: req.params.id,
    });

    const performance = {
      instructorId: instructor._id,
      totalStudents: students.length,
      totalAttendanceRecords: students.reduce(
        (total, student) => total + student.attendance.length,
        0
      ),
    };

    res.status(200).json({
      success: true,
      data: performance,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Upload Instructor Document
const uploadInstructorDocument = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    instructor.documents.push({
      fileName: req.file.originalname,
      filePath: req.file.path,
    });

    await instructor.save();

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      data: instructor.documents,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInstructor,
  getInstructors,
  getInstructorById,
  getMyInstructorProfile,
  updateInstructor,
  deleteInstructor,
  getInstructorAvailability,
  updateInstructorAvailability,
  getInstructorStudents,
  getInstructorPerformance,
  uploadInstructorDocument,
};