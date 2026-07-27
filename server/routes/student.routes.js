const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getAttendance,
  updateAttendance,
} = require('../controllers/student.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// Need to find the logged-in user(student,admin) 
router.post('/', verifyToken, createStudent);
router.get('/', verifyToken, requireRole('admin'), getAllStudents);
router.get('/:id', verifyToken, getStudentById);
router.put('/:id', verifyToken, updateStudent);
router.delete('/:id', verifyToken, requireRole('admin'), deleteStudent);

router.get('/:id/attendance', verifyToken, getAttendance);
router.put('/:id/attendance', verifyToken, updateAttendance);

module.exports = router;