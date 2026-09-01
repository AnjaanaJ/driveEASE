import { useState } from 'react';

function ReportFilter({ onFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    setError('');

    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date must be before end date.');
      return;
    }

    onFilter(startDate, endDate);
  };

  return (
    <div className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
      <h2 className="text-lg font-bold text-text-primary mb-4">Date range filter</h2>
      {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-1">Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm text-text-secondary mb-1">End date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-background border border-white/10 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          onClick={handleApply}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white font-medium px-5 py-2.5 rounded-lg whitespace-nowrap"
        >
          Apply filter
        </button>
      </div>
    </div>
  );
}

export default ReportFilter;