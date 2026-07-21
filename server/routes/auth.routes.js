const express = require('express');
const router = express.Router();
const { registerUser, loginUser ,logoutUser,changePassword,forgotPassword,resetPassword} = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole=require('../middleware/requireRole');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',verifyToken,logoutUser);
router.put('/change-password',verifyToken,changePassword);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);

router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid!', user: req.user });
});

router.get('/admin-test', verifyToken, requireRole('admin'), (req, res) => {
  res.status(200).json({ message: 'You are an admin! Access granted.' });
});

module.exports = router;