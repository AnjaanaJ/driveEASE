const express = require('express');
const router = express.Router();
const { createLesson,getLessons,getLessonById,updateLesson,cancelLesson,getAvailableSlots} = require('../controllers/lesson.controller');
const verifyToken = require('../middleware/verifyToken');
const conflictChecker = require('../middleware/conflictChecker');


router.post('/', verifyToken, conflictChecker, createLesson);
router.get('/available-slots', verifyToken, getAvailableSlots);
router.get('/', verifyToken, getLessons);
router.get('/:id', verifyToken, getLessonById);
router.put('/:id', verifyToken, updateLesson);
router.delete('/:id', verifyToken, cancelLesson);

module.exports = router;