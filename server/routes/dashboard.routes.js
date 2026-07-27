const express = require('express');
const router = express.Router();
const {
  getAdminDashboard,
  getInstructorDashboard,
  getStudentDashboard,
} = require('../controllers/dashboard.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

router.get('/admin', verifyToken, requireRole('admin'), getAdminDashboard);
router.get('/instructor/:id', verifyToken, getInstructorDashboard);
router.get('/student/:id', verifyToken, getStudentDashboard);

module.exports = router;