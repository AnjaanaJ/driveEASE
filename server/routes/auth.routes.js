const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole=require('../middleware/requireRole');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid!', user: req.user });
});

router.get('/admin-test', verifyToken, requireRole('admin'), (req, res) => {
  res.status(200).json({ message: 'You are an admin! Access granted.' });
});

module.exports = router;