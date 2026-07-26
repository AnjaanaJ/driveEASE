const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const Settings=require('../models/Settings');


//    Get all users (admin only)
//   GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password field
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//    Approve a user
//   PUT /api/admin/users/:id/approve
const approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isApproved = true;
    await user.save();

    await ActivityLog.create({userId:req.user.id, action:`Approved user: ${user.email}`});

    res.status(200).json({ message: 'User approved successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//    Reject a user
//   PUT /api/admin/users/:id/reject
const rejectUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isApproved = false;
    await user.save();

    await ActivityLog.create({userId:req.user.id, action: `Rejected user:${user.email}`});

    res.status(200).json({ message: 'User rejected successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//    Delete a user
//   DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();
    await ActivityLog.create({userId: req.user.id, action :`Deleted user: ${user.email}`});

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//get system activity logs

const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('userId', 'name email role')
      .sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//    Update a user's role
//   PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // 1. Validate the role is one of the allowed values
    const validRoles = ['admin', 'instructor', 'student'];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Please provide a valid role (admin, instructor, or student)' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Prevent an admin from changing their own role (avoids accidental self-lockout)
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot change your own role' });
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    await ActivityLog.create({
      userId: req.user.id,
      action: `Changed role for ${user.email} from ${oldRole} to ${role}`,
    });

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//update system settings
const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.status(200).json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
module.exports = { getAllUsers, approveUser, rejectUser, deleteUser, getActivityLogs,updateSettings,updateUserRole };
