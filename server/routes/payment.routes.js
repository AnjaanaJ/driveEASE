const express = require('express');
const router = express.Router();
const {
    createPayment,
    getAllPayments,
    getPaymentsByStudent,
    updatePaymentStatus,
    getPaymentById,
    getMonthlySummary,
} = require('../controllers/payment.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

router.post('/', verifyToken, createPayment);
router.get('/', verifyToken, requireRole('admin'), getAllPayments);
router.get('/summary/monthly', verifyToken, requireRole('admin'), getMonthlySummary);
router.get('/student/:studentId', verifyToken, getPaymentsByStudent);
router.get('/:id', verifyToken, getPaymentById);
router.put('/:id', verifyToken, requireRole('admin'), updatePaymentStatus);

module.exports = router;
