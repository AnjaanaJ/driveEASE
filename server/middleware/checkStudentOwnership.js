const Student = require('../models/Student');

// Checks whether the logged-in user is either:
//   (a) an admin, OR
//   (b) the actual owner of the student profile being accessed (req.params.id)
//
// Must run AFTER verifyToken (needs req.user to already exist).
// On success, attaches the found student document to req.student so the
// controller doesn't need to query the database again.
const checkStudentOwnership = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner = student.userId.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res
        .status(403)
        .json({ message: 'Access denied: this is not your student profile' });
    }

    req.student = student;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = checkStudentOwnership;