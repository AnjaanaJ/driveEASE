const express = require('express');
const router = express.Router();
const {
  getStudentReport,
  getInstructorReport,
  getFinancialReport,
} = require('../controllers/report.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

router.get('/students', verifyToken, requireRole('admin'), getStudentReport);
router.get('/instructors', verifyToken, requireRole('admin'), getInstructorReport);
router.get('/financial', verifyToken, requireRole('admin'), getFinancialReport);

module.exports = router;