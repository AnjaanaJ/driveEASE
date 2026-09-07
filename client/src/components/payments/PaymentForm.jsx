import { useState, useEffect, useRef } from 'react';
import { recordPayment, searchStudents } from '../../api/paymentApi';
import { CreditCard } from 'lucide-react';

function PaymentForm({ onSuccess }) {
  const [form, setForm] = useState({ amount: '', method: 'Cash', status: 'Pending' });
  const [error, setError] = useState('');

  // Student search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Search students as the admin types, with a small delay so we don't
  // fire an API call on every single keystroke
  useEffect(() => {
    if (!searchTerm || selectedStudent) {
      setSearchResults([]);
      return;
    }

    const delayedSearch = setTimeout(async () => {
      try {
        const res = await searchStudents(searchTerm);
        setSearchResults(res.data);
        setShowDropdown(true);
      } catch (err) {
        console.error('Student search failed', err);
      }
    }, 400); // wait 400ms after the last keystroke before searching

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, selectedStudent]);

  // Close the dropdown if the admin clicks outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchTerm(`${student.studentId || student._id} — ${student.userId?.name || 'Unknown'}`);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedStudent(null); // typing again means they're picking someone new
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedStudent) {
      setError('Please search and select a student.');
      return;
    }
    if (!form.amount) {
      setError('Amount is required.');
      return;
    }
    if (Number(form.amount) <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }

    try {
      await recordPayment({
        studentId: selectedStudent._id, // the real ObjectId, sent behind the scenes
        amount: Number(form.amount),
        method: form.method,
        status: form.status,
      });

      // Reset everything
      setForm({ amount: '', method: 'Cash', status: 'Pending' });
      setSelectedStudent(null);
      setSearchTerm('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record payment.');
    }
  };

  return (
    <div className="relative w-full">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-5">
          <CreditCard className="w-5 h-5 text-accent" /> Record payment
        </h2>
        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm text-text-secondary mb-1">Student</label>
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
              placeholder="Search by name, NIC, or code..."
              className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary"
            />

            {showDropdown && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-surface border border-white/10 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {searchResults.map((student) => (
                  <button
                    key={student._id}
                    type="button"
                    onClick={() => handleSelectStudent(student)}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 text-sm text-text-primary border-b border-white/5 last:border-0"
                  >
                    <span className="font-medium">{student.studentId || student._id}</span>
                    {' — '}
                    <span className="text-text-secondary">{student.userId?.name || 'Unknown'}</span>
                  </button>
                ))}
              </div>
            )}

            {showDropdown && searchTerm && searchResults.length === 0 && (
              <div className="absolute z-10 mt-1 w-full bg-surface border border-white/10 rounded-lg p-3 text-sm text-text-secondary">
                No students found.
              </div>
            )}
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