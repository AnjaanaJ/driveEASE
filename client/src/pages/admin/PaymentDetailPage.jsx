import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaymentById, downloadInvoice } from '../../api/paymentApi';
import PaymentStatusBadge from '../../components/payments/PaymentStatusBadge';

function PaymentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPaymentById(id)
      .then((res) => setPayment(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load payment'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownload = async () => {
    try {
      await downloadInvoice(id);
    } catch (err) {
      console.error('Failed to download invoice', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <p className="text-text-secondary">Loading payment details...</p>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen bg-background p-8">
        <p className="text-red-400">{error || 'Payment not found'}</p>
        <button
          onClick={() => navigate('/admin/payments')}
          className="mt-4 text-accent underline"
        >
          Back to payments
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/admin/payments')}
          className="text-text-secondary text-sm mb-4 hover:text-text-primary transition-colors"
        >
          ← Back to payments
        </button>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />

          <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">Invoice</h1>
                <p className="text-text-secondary text-sm">{payment.invoiceRef}</p>
              </div>
              <PaymentStatusBadge status={payment.status} />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-white/10">
              <div>
                <p className="text-text-secondary text-xs mb-1">Student</p>
                <p className="text-text-primary font-medium">
                  {payment.studentId?.name || payment.studentId || 'Unknown'}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Date</p>
                <p className="text-text-primary font-medium">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Payment method</p>
                <p className="text-text-primary font-medium">{payment.method}</p>
              </div>
              <div>
                <p className="text-text-secondary text-xs mb-1">Amount</p>
                <p className="text-text-primary font-bold text-lg">LKR {payment.amount}</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-medium px-5 py-2.5 rounded-lg"
            >
              Download invoice PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetailPage;