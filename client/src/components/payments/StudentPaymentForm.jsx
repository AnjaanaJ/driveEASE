import { useState } from 'react';
import { recordPayment } from '../../api/paymentApi';
import { CreditCard, Building2, CheckCircle2 } from 'lucide-react';

function StudentPaymentForm({ studentId, onSuccess }) {
  const [form, setForm] = useState({ amount: '', receipt: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => setForm({ ...form, receipt: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.amount) {
      setError('Please enter an amount.');
      return;
    }
    if (Number(form.amount) <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    if (!form.receipt) {
      setError('Please upload proof of your bank transfer.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await recordPayment({
        studentId,
        amount: Number(form.amount),
        method: 'Online Transfer',
        status: 'Pending',
        receipt: form.receipt,
      });

      
      setSuccess('Payment submitted. It will show as Pending until confirmed by our staff.');
      setForm({ amount: '', receipt: null });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit payment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />

      <div className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        {/* Gateway-style header */}
        <div className="flex items-center gap-2 mb-1">
          <CreditCard className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-bold text-text-primary">Secure Payment</h2>
        </div>
        <p className="text-text-secondary text-xs mb-5">
          driveEASE Payments · Bank transfer only — no card processing available yet
        </p>

        {/* Bank details, styled like a "pay to" card */}
        <div className="bg-background/60 border border-white/10 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-primary" />
            <p className="text-text-secondary text-xs uppercase tracking-wide">Transfer to</p>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Bank</span>
              <span className="text-text-primary font-medium">Commercial Bank</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Account name</span>
              <span className="text-text-primary font-medium">driveEASE Training Center</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Account number</span>
              <span className="text-text-primary font-medium">8001 2345 6789</span>
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
        {success && (
          <div className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-lg p-3 mb-4">
            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-sm text-accent">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-text-secondary mb-1">Amount transferred (LKR)</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 12000"
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2.5 text-text-primary text-lg font-medium placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary mb-4"
          />
            
          <label className="block text-sm text-text-secondary mb-1">Upload proof of transfer</label>
          <input
            type="file"
            accept="image/jpeg,image/png,application/pdf"
            onChange={handleFileChange}
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-primary/20 file:text-primary file:text-sm focus:outline-none focus:ring-1 focus:ring-primary mb-1"
          />
          <p className="text-text-secondary text-xs mb-4">JPG, PNG, or PDF — max 5MB</p>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg"
          >
            {submitting ? 'Submitting...' : 'I\'ve made this transfer'}
          </button>

          <p className="text-text-secondary text-xs text-center mt-3">
            This confirms you've sent the transfer. Our staff will verify and mark it as Paid.
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentPaymentForm;