const express = require('express');
const router = express.Router();
const {
  createNotification,
  getNotificationsForUser,
  markAsRead,
  markAllAsRead,
} = require('../controllers/notification.controller');
const verifyToken = require('../middleware/verifyToken');

router.post('/', verifyToken, createNotification);
router.get('/:userId', verifyToken, getNotificationsForUser);
router.put('/:id/read', verifyToken, markAsRead);
router.put('/read-all/:userId', verifyToken, markAllAsRead);

module.exports = router;