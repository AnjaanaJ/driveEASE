import { useEffect, useState } from 'react';
import { getAllPayments, downloadInvoice } from '../../api/paymentApi';
import PaymentForm from '../../components/payments/PaymentForm';
import PaymentStatusBadge from '../../components/payments/PaymentStatusBadge';

function PaymentListPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    try {
      const res = await getAllPayments();
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const handleDownload = async (id) => {
    try {
        await downloadInvoice(id);
    } catch (err) {
        console.error('Failed to download invoice', err);
    }
  };

    return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <span className="inline-block bg-surface/70 border border-white/10 text-accent text-xs px-3 py-1 rounded-full mb-4">
          Admin panel
        </span>

        <h1 className="text-3xl font-bold text-text-primary mb-1">
          Payment <span className="text-gradient-brand">management</span>
        </h1>
        <p className="text-text-secondary mb-8">Record payments, track status, and download invoices.</p>

        <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <span className="text-accent">📋</span> Recent transactions
            </h2>
            <div className="flex gap-2">
              <button className="text-sm text-text-secondary border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors">
                Filter
              </button>
              <button className="text-sm text-text-secondary border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/5 transition-colors">
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-text-secondary">
                  <th className="py-3 px-3 font-medium">Student</th>
                  <th className="py-3 px-3 font-medium">Invoice</th>
                  <th className="py-3 px-3 font-medium">Amount</th>
                  <th className="py-3 px-3 font-medium">Date</th>
                  <th className="py-3 px-3 font-medium">Method</th>
                  <th className="py-3 px-3 font-medium">Status</th>
                  <th className="py-3 px-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-text-secondary">
                      Loading payments...
                    </td>
                  </tr>
                )}
                {!loading && payments.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-text-secondary">
                      No payments found.
                    </td>
                  </tr>
                )}
                {!loading &&
                  payments.map((p) => (
                    <tr key={p._id} className="border-b border-white/5 last:border-0">
                      <td className="py-3 px-3 text-text-primary font-medium">
                        {p.studentId?.name || p.studentId?._id || (typeof p.studentId === 'string' ? p.studentId : 'Unknown')}
                      </td>
                      <td className="py-3 px-3 text-text-secondary">{p.invoiceRef}</td>
                      <td className="py-3 px-3 text-text-primary">LKR {p.amount}</td>
                      <td className="py-3 px-3 text-text-secondary">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 text-text-secondary">{p.method}</td>
                      <td className="py-3 px-3">
                        <PaymentStatusBadge status={p.status} />
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleDownload(p._id)}
                          className="text-accent hover:opacity-80 text-sm underline underline-offset-2"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <PaymentForm onSuccess={loadPayments} />
      </div>
    </div>
  );
}

export default PaymentListPage;