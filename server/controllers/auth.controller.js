const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc   Register a new user
// @route  POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 5. Generate token and respond
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// @desc   Login user
// @route  POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Generate token and respond
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const logoutUser=async (req,res)=>{
  try{
    //logout is handled by the client deleting the account
    res.status(200).json({message:"Logged Out Successfully!!!"});

  }catch(error){
    res.status(500).json({message: 'server error', error: error.message});
  }
};

const changePassword=async (req,res)=>{
  try{
    const{currentPassword,newPassword}=req.body;

    //checking the required fields
    if(!currentPassword || !newPassword){
      return res.status(400).json({
        message: ' * Please provide currnt and new password correctly'
      });
    }
    //get the logged-in user
    const user=await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({
        message:'User not found'
      });
    }
    //verifyinh wheather the current password is correct
    const isMatch =await bcrypt.compare(currentPassword, user.password);
    if(!isMatch){
      return res.status(401).json({
        message: 'Current password is incorrect'
      });
    }
    //hash and save the password
    const salt =await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(newPassword,salt);
    await user.save();
    
    res.status(200).json({
      message: 'Password changed successfully'
    });
  }catch(error){
    res.status(500).json({
      message: 'server error ', error:error.message
    });
  }
};
module.exports = { registerUser, loginUser, logoutUser, changePassword };