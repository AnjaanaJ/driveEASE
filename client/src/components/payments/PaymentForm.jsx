import { useState } from 'react';
import { recordPayment } from '../../api/paymentApi';

function PaymentForm({ onSuccess }) {
  
  const [form, setForm] = useState({ studentId: '', amount: '', method: 'Cash', status: 'Pending' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');

    if (!form.studentId || !form.amount) {
      setError('Student ID and amount are required.');
      return;
    }
    if (Number(form.amount) <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }

    try {
      await recordPayment({ ...form, amount: Number(form.amount) });
      setForm({ studentId: '', amount: '', method: 'Cash', status: 'Pending' }); // reset form
      if (onSuccess) onSuccess(); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record payment.');
    }
  };

  return (
    <div className="relative w-full">
      {}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-5">
          <span className="text-accent">💳</span> Record payment
        </h2>
        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm text-text-secondary mb-1">Student ID</label>
          <input
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            placeholder="e.g. 650000000000000000000001"
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm text-text-secondary mb-1">Amount (LKR)</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="e.g. 5000"
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">Method</label>
            <select
              name="method"
              value={form.method}
              onChange={handleChange}
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option>Cash</option>
              <option>Card</option>
              <option>Bank Transfer</option>
            </select>
          </div>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Invoice #</label>
              <input
                disabled
                value="Auto-generated"
                className="w-full bg-background/50 border border-white/5 rounded-lg px-3 py-2 text-text-secondary/60 cursor-not-allowed"
                />
            </div>
          

          <div>
            <label className="block text-sm text-text-secondary mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-medium px-5 py-2.5 rounded-lg"
        >
          Save payment
        </button>
        
      </form>
    </div>
  );
}

export default PaymentForm;