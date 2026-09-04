import { useNavigate } from 'react-router-dom';

function QuickAccessShortcuts() {
  const navigate = useNavigate();

  const shortcuts = [
    { label: 'Record payment', path: '/admin/payments', icon: '💳' },
    { label: 'View reports', path: '/admin/reports', icon: '📊' },
    { label: 'Manage students', path: '/admin/students', icon: '🎓' },
    { label: 'Manage instructors', path: '/admin/instructors', icon: '🧑‍🏫' },
    { label: 'Manage vehicles', path: '/admin/vehicles', icon: '🚗' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {shortcuts.map((s) => (
        <button
          key={s.path}
          onClick={() => navigate(s.path)}
          className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-left hover:bg-white/5 transition-colors"
        >
          <span className="text-2xl mb-2 block">{s.icon}</span>
          <span className="text-text-primary text-sm font-medium">{s.label}</span>
        </button>
      ))}
    </div>
  );
}

export default QuickAccessShortcuts;