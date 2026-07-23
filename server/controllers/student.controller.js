const Student = require('../models/Student');

// Create a new student profile
// POST /api/students
const createStudent = async (req, res) => {
  try {
    const { userId, nic, phone, address, coursePackage } = req.body;

    // 1. Required fields check
    if (!userId || !nic || !phone) {
      return res.status(400).json({ message: 'Please provide userId, nic and phone' });
    }

    // 2. NIC already exists ida balanawa
    const existingStudent = await Student.findOne({ nic });
    if (existingStudent) {
      return res.status(400).json({ message: 'A student with this NIC already exists' });
    }

    // 3. Student create karanawa
    const student = await Student.create({
      userId,
      nic,
      phone,
      address,
      coursePackage,
    });

    res.status(201).json({ message: 'Student profile created successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all students (admin only) - searchable
// GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const { search } = req.query; // e.g. /api/students?search=silva

    let query = {};
    if (search) {
      query = {
        $or: [
          { nic: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const students = await Student.find(query)
      .populate('userId', 'name email')
      .populate('coursePackage', 'name type price');

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a single student by id
// GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('coursePackage', 'name type price')
      .populate('assignedInstructor', 'name');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a student profile
// PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const { phone, address, coursePackage } = req.body;

    if (phone) student.phone = phone;
    if (address) student.address = address;
    if (coursePackage) student.coursePackage = coursePackage;

    await student.save();

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a student (admin only)
// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await student.deleteOne();

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};