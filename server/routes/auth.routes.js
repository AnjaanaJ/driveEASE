const express = require('express');
const router = express.Router();
const { registerUser, loginUser ,logoutUser,changePassword,forgotPassword,resetPassword,updateProfile} = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole=require('../middleware/requireRole');
const User = require('../models/User');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',verifyToken,logoutUser);
router.put('/change-password',verifyToken,changePassword);
router.put('/update-profile',verifyToken,updateProfile);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpire');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Token is valid!',
      user: {
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/admin-test', verifyToken, requireRole('admin'), (req, res) => {
  res.status(200).json({ message: 'You are an admin! Access granted.' });
});

module.exports = router;