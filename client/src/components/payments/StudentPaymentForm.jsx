import { useState } from 'react';
import { recordPayment } from '../../api/paymentApi';
import { CreditCard } from 'lucide-react';

function StudentPaymentForm({ studentId, onSuccess }) {
  const [form, setForm] = useState({ amount: '', method: 'Online Transfer' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

    try {
      await recordPayment({
        studentId,
        amount: Number(form.amount),
        method: form.method,
        status: 'Pending', // student-submitted payments always start as Pending
      });

      setSuccess('Payment submitted. It will show as Pending until confirmed by an admin.');
      setForm({ amount: '', method: 'Cash' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit payment.');
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-2">
          <CreditCard className="w-5 h-5 text-accent" /> Make a payment
        </h2>
        <p className="text-text-secondary text-sm mb-5">
          Submitting here logs your payment as Pending. Our staff will confirm it once received.
        </p>

        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
        {success && <p className="text-sm text-accent mb-3">{success}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <label className="block text-sm text-text-secondary mb-1">Amount (LKR)</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="e.g. 12000"
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="text-text-secondary text-xs mt-2">
            Payments are made via bank transfer. Please transfer the amount and submit this form to notify our staff.
            </p>
          
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-medium px-5 py-2.5 rounded-lg"
        >
          Submit payment
        </button>
      </form>
    </div>
  );
}

export default StudentPaymentForm;