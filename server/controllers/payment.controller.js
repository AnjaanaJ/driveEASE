const Payment = require('../models/Payment');
const crypto = require('crypto');

const createPayment = async (req, res) => {
  try {
    const { studentId, amount, method, status } = req.body;
    const invoiceRef = 'INV-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    const payment = await Payment.create({ studentId, amount, method, status, invoiceRef });
    res.status(201).json({ message: 'Payment recorded successfully', payment });
  } catch (error) {
    res.status(400).json({ message: 'Failed to record payment', error: error.message });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('studentId', 'name email');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('studentId','name email');
    if(!payment) {
      return res.status(404).json({ message: 'Payment not found'});
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error',error: error.message});
  }
};

const getPaymentsByStudent = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    payment.status = req.body.status;
    await payment.save();
    res.status(200).json({ message: 'Payment status updated', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMonthlySummary = async (req, res) => {
  try {
    const summary = await Payment.aggregate([
      {
        $match: { status: 'Paid' }, 
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalIncome: { $sum: '$amount' },
          totalPayments: { $sum: 1 },
        },
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }, 
      },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createPayment, getAllPayments, getPaymentsByStudent, updatePaymentStatus, getPaymentById, getMonthlySummary, };