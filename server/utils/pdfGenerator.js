const PDFDocument = require('pdfkit');

const generateInvoicePDF = (payment, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${payment.invoiceRef}.pdf`);

  doc.pipe(res);

  doc.fontSize(20).text('driveEASE - Payment Invoice', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Invoice Ref: ${payment.invoiceRef}`);
  doc.text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`);
  doc.text(`Student: ${payment.studentId?.name || payment.studentId}`);
  doc.moveDown();

  doc.text(`Amount: LKR ${payment.amount}`);
  doc.text(`Payment Method: ${payment.method}`);
  doc.text(`Status: ${payment.status}`);

  doc.moveDown();
  doc.fontSize(10).text('Thank you for choosing driveEASE.', { align: 'center' });

  doc.end();
};

module.exports = generateInvoicePDF;