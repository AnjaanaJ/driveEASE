import { useNavigate } from 'react-router-dom';
import { CreditCard, BarChart3, GraduationCap, UserCog, Car} from 'lucide-react';

function QuickAccessShortcuts() {
  const navigate = useNavigate();

  const shortcuts = [
    { label: 'Record payment', path: '/admin/payments', icon: CreditCard },
    { label: 'View reports', path: '/admin/reports', icon: BarChart3 },
    { label: 'Manage students', path: '/admin/students', icon: GraduationCap },
    { label: 'Manage instructors', path: '/admin/instructors', icon: UserCog },
    { label: 'Manage vehicles', path: '/admin/vehicles', icon: Car },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
      {shortcuts.map((s) => {
        const Icon = s.icon;
        return (
          <button
            key={s.path}
            onClick={() => navigate(s.path)}
            className="bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-left hover:bg-white/5 transition-colors"
            >
              <Icon className="w-6 h-6 mb-2 text-accent"/>
              <span className="text-text-primary text-sm font-medium">{s.label}</span>
            </button>
        );
      })}
    </div>
  );
}

export default QuickAccessShortcuts;