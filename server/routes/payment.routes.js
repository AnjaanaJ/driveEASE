const express = require('express');
const router = express.Router();
const {
    createPayment,
    getAllPayments,
    getPaymentsByStudent,
    updatePaymentStatus,
} = require('../controllers/payment.controller');
const verifyToken = require('../middleware/verifyToken');
const requireRole = require('../middleware/requireRole');

router.post('/', verifyToken, createPayment);
router.get('/', verifyToken, requireRole('admin'), getAllPayments);
router.get('/student/:studentId', verifyToken, getPaymentsByStudent);
router.put('/:id', verifyToken, requireRole('admin'), updatePaymentStatus);

module.exports = router;
