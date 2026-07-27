import { useEffect, useState } from 'react';
import { getPaymentsByStudent } from '../../api/paymentApi';
import PaymentTable from '../../components/payments/PaymentTable';

function PaymentHistoryPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = '650000000000000000000001';

    getPaymentsByStudent(studentId)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
    const totalPaid = payments
      .filter((payment) => payment.status === 'Paid')
      .reduce((sum, p) => sum + p.amount, 0);

    const totalPending = payments
      .filter((p) => p.status === 'Pending' || p.status === 'Overdue')
      .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-background p-8">
        <div className="max=w=4xl mx-auto">
        <span className="inline-block bg-surface/70 border border-white/10 text-accent text-xs px-3 py-1 rounded-full mb-4">
             Your account
        </span>

        <h1 className="text-3xl font-bold text-text-primary mb-1">
            My <span className="text-gradient-brand">payments</span>
        </h1>
        <p className="text-text-secondary mb-8">View your payment history and download invoices.</p>

        {!loading && payments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-surface/70 border border-white/10 rounded-xl p-4">
              <p className="text-text-secondary text-xs mb-1">Total paid</p>
              <p className="text-text-primary text-xl font-bold">LKR {totalPaid}</p>
            </div>
            <div className="bg-surface/70 border border-white/10 rounded-xl p-4">
              <p className="text-text-secondary text-xs mb-1">Pending / overdue</p>
              <p className="text-text-primary text-xl font-bold">LKR {totalPending}</p>
            </div>
            <div className="bg-surface/70 border border-white/10 rounded-xl p-4">
              <p className="text-text-secondary text-xs mb-1">Total payments</p>
              <p className="text-text-primary text-xl font-bold">{payments.length}</p>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-text-secondary">Loading your payments...</p>
        ) : (
          <PaymentTable payments={payments} />
        )}
       </div>
    </div>
  );
}

export default PaymentHistoryPage;