const express = require('express');
const router = express.Router();
const { getAllUsers, approveUser, rejectUser, deleteUser,getActivityLogs } = require('../controllers/admin.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

router.get('/users', verifyToken, requireRole('admin'), getAllUsers);
router.put('/users/:id/approve', verifyToken, requireRole('admin'), approveUser);
router.put('/users/:id/reject', verifyToken, requireRole('admin'), rejectUser);
router.delete('/users/:id', verifyToken, requireRole('admin'), deleteUser);
router.get('/logs',verifyToken,requireRole('admin'),getActivityLogs);

module.exports = router;