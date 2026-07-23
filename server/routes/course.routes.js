const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

// The public courses - any one can view it
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// only admin can create/update/delete karanna puluwan
router.post('/', verifyToken, requireRole('admin'), createCourse);
router.put('/:id', verifyToken, requireRole('admin'), updateCourse);
router.delete('/:id', verifyToken, requireRole('admin'), deleteCourse);

module.exports = router;