const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid!', user: req.user });
});
module.exports = router;