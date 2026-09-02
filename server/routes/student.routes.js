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
  uploadDocument,
  approveStudent,
  rejectStudent,
  getStudentByUserId,
} = require('../controllers/student.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');
const upload = require('../middleware/upload.middleware');
const checkStudentOwnership = require('../middleware/checkStudentOwnership');

// Need to find the logged-in user(student,admin)
router.get('/me/:userId', verifyToken, getStudentByUserId);

router.post('/', verifyToken, createStudent);
router.get('/', verifyToken, requireRole('admin'), getAllStudents);

router.get('/:id', verifyToken, checkStudentOwnership, getStudentById);
router.put('/:id', verifyToken, checkStudentOwnership, updateStudent);
router.delete('/:id', verifyToken, requireRole('admin'), deleteStudent);

router.get('/:id/attendance', verifyToken, checkStudentOwnership, getAttendance);
router.put('/:id/attendance', verifyToken, requireRole('admin'), checkStudentOwnership, updateAttendance);
router.post(
  '/:id/documents',
  verifyToken,
  checkStudentOwnership,
  upload.single('document'),
  uploadDocument
);

router.put('/:id/approve', verifyToken, requireRole('admin'), approveStudent);
router.put('/:id/reject', verifyToken, requireRole('admin'), rejectStudent);

module.exports = router;