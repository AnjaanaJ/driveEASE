const express = require('express');
const router = express.Router();
const { createLesson,getLessons } = require('../controllers/lesson.controller');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createLesson);
router.get('/', verifyToken, getLessons);
module.exports = router;