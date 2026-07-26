const express = require('express');
const router = express.Router();
const {
  createNotification,
  getNotificationsForUser,
  markAsRead,
  markAllAsRead,
} = require('../controllers/notification.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

router.post('/', verifyToken,requireRole('admin'), createNotification);
router.get('/:userId', verifyToken, getNotificationsForUser);
router.put('/:id/read', verifyToken, markAsRead);
router.put('/read-all/:userId', verifyToken, markAllAsRead);

module.exports = router;