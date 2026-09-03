const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Payment = require('../models/Payment');

const getStudentReport = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('userId', 'name email')
      .populate('coursePackage', 'name price')
      .select('nic phone userId coursePackage createdAt');

    res.status(200).json({
      totalStudents: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getInstructorReport = async (req, res) => {
  try {
    const instructors = await Instructor.find()
      .populate('user', 'name email')
      .select('phone licenseNumber experience qualification status user');

    res.status(200).json({
      totalInstructors: instructors.length,
      instructors,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getFinancialReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return res.status(400).json({ message: 'startDate must be before endDate' });
    }

    const payments = await Payment.find({
      createdAt: { $gte: start, $lte: end },
    }).sort({ createdAt: -1 });

    const totalRevenue = payments
      .filter((p) => p.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);

    const totalPending = payments
      .filter((p) => p.status === 'Pending' || p.status === 'Overdue')
      .reduce((sum, p) => sum + p.amount, 0);

    res.status(200).json({
      startDate,
      endDate,
      totalPayments: payments.length,
      totalRevenue,
      totalPending,
      payments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getStudentReport, getInstructorReport, getFinancialReport };