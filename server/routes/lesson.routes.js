const express = require('express');
const router = express.Router();
const { createLesson,getLessons,getLessonById,updateLesson,cancelLesson,getAvailableSlots,getLessonsByStudent, getLessonsByInstructor} = require('../controllers/lesson.controller');
const verifyToken = require('../middleware/verifyToken');
const conflictChecker = require('../middleware/conflictChecker');
const requireRole = require('../middleware/requireRole');


router.post('/', verifyToken, conflictChecker, createLesson);
router.get('/available-slots', verifyToken, getAvailableSlots);
router.get('/student/:studentId', verifyToken, getLessonsByStudent);
router.get('/instructor/:instructorId', verifyToken, getLessonsByInstructor);
router.get('/', verifyToken,requireRole('admin'), getLessons);
router.get('/:id', verifyToken, getLessonById);
router.put('/:id', verifyToken, updateLesson);
router.delete('/:id', verifyToken, cancelLesson);

module.exports = router;