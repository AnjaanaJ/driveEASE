import { useEffect, useState } from 'react';
import { getPaymentsByStudent } from '../../api/paymentApi';
import PaymentTable from '../../components/payments/PaymentTable';

function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const studentId = '650000000000000000000001';

    getPaymentsByStudent(studentId)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <span className="inline-block bg-surface/70 border border-white/10 text-accent text-xs px-3 py-1 rounded-full mb-4">
        Your account
      </span>

      <h1 className="text-3xl font-bold text-text-primary mb-1">
        My <span className="text-gradient-brand">payments</span>
      </h1>
      <p className="text-text-secondary mb-8">View your payment history and download invoices.</p>

      <PaymentTable payments={payments} />
    </div>
  );
}

export default PaymentHistoryPage;