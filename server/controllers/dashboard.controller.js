const Payment = require('../models/Payment');
const Lesson = require('../models/Lesson');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Vehicle = require('../models/Vehicle');

const getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalInstructors = await Instructor.countDocuments();
    const totalBookings = await Lesson.countDocuments();

    const revenueResult = await Payment.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const vehicleStatusBreakdown = await Vehicle.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      totalStudents,
      totalInstructors,
      totalBookings,
      totalRevenue,
      vehicleStatusBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getInstructorDashboard = async (req, res) => {
  try {
    const instructorId = req.params.id;

    const assignedStudents = await Student.find({ assignedInstructor: instructorId })
      .select('userId nic phone');

    const upcomingLessons = await Lesson.find({
      instructorId,
      date: { $gte: new Date() },
      status: 'Scheduled',
    }).sort({ date: 1 });

    res.status(200).json({
      totalAssignedStudents: assignedStudents.length,
      assignedStudents,
      upcomingLessons,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.params.id;

    const lessons = await Lesson.find({ studentId }).sort({ date: -1 });
    const payments = await Payment.find({ studentId }).sort({ createdAt: -1 });

    const completedLessons = lessons.filter((l) => l.status === 'Completed').length;
    const totalLessons = lessons.length;

    const outstandingBalance = payments
      .filter((p) => p.status === 'Pending' || p.status === 'Overdue')
      .reduce((sum, p) => sum + p.amount, 0);

    res.status(200).json({
      totalLessons,
      completedLessons,
      upcomingLessons: lessons.filter((l) => l.status === 'Scheduled'),
      outstandingBalance,
      recentPayments: payments.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAdminDashboard, getInstructorDashboard, getStudentDashboard };