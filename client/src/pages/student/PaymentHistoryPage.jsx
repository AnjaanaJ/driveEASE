import { useEffect, useState } from 'react';
import { getPaymentsByStudent, downloadInvoice } from '../../api/paymentApi';
import PaymentStatusBadge from '../../components/payments/PaymentStatusBadge';

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
    const handleDownload = async (id) => {
      try {
        await downloadInvoice(id);
      } catch (err) {
        console.error('Failed to download invoice', err);
      }
      };
      const dueBalance = payments.find((p) => p.status === 'Pending' || p.status === 'Overdue');
    

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-text-primary">Payments and package</h1>
        <p className="text-text-secondary mb-6">Manage your fees and view payment history</p>

        {dueBalance && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-6 flex items-center justify-between">
            <div>
              <p className="text-red-400 font-bold">LKR {dueBalance.amount} balance due</p>
              <p className="text-red-400/70 text-sm">Invoice {dueBalance.invoiceRef}</p>
            </div>
            <button
              onClick={() => handleDownload(dueBalance._id)}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-medium px-5 py-2.5 rounded-lg"
            >
              View invoice
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[280px]">
            <h2 className="text-xl font-bold text-text-primary mb-4">Current package</h2>
            <p className="text-text-secondary text-sm">
              Package details will appear here once the Course module is connected.
            </p>
          </div>

          <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[280px]">
            <h2 className="text-xl font-bold text-text-primary mb-4">Payment history</h2>

            {loading ? (
              <p className="text-text-secondary text-sm">Loading...</p>
            ) : payments.length === 0 ? (
              <p className="text-text-secondary text-sm">No payments found.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-text-secondary">
                    <th className="py-2 font-medium">Invoice</th>
                    <th className="py-2 font-medium">Date</th>
                    <th className="py-2 font-medium">Amount</th>
                    <th className="py-2 font-medium">Method</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p._id} className="border-b border-white/5 last:border-0">
                      <td className="py-2 text-text-primary">{p.invoiceRef}</td>
                      <td className="py-2 text-text-secondary">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-2 text-text-primary">LKR {p.amount}</td>
                      <td className="py-2 text-text-secondary">{p.method}</td>
                      <td className="py-2">
                        <PaymentStatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryPage;