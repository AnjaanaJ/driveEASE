const express = require('express');
const router = express.Router();
const { createLesson,getLessons,getLessonById } = require('../controllers/lesson.controller');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createLesson);
router.get('/', verifyToken, getLessons);
router.get('/:id', verifyToken, getLessonById);
module.exports = router;