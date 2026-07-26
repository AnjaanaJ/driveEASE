import { useEffect, useState } from 'react';
import { getAllPayments } from '../../api/paymentApi';
import PaymentForm from '../../components/payments/PaymentForm';
import PaymentTable from '../../components/payments/PaymentTable';

function PaymentListPage() {
  const [payments, setPayments] = useState([]);

  const loadPayments = async () => {
    try {
      const res = await getAllPayments();
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8">
      <span className="inline-block bg-surface/70 border border-white/10 text-accent text-xs px-3 py-1 rounded-full mb-4">
        Admin panel
      </span>

      <h1 className="text-3xl font-bold text-text-primary mb-1">
        Payment <span className="text-gradient-brand">management</span>
      </h1>
      <p className="text-text-secondary mb-8">Record payments, track status, and download invoices.</p>

      <PaymentForm onSuccess={loadPayments} />
      <PaymentTable payments={payments} />
    </div>
  );
}

export default PaymentListPage;