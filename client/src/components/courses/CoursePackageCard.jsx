import { useNavigate } from "react-router-dom";

function CoursePackageCard({ course }) {
  const navigate = useNavigate();
  const isPopular = course.type === "VIP";

  const handleChoosePackage = () => {
    navigate(`/student/register-profile?course=${course._id}`);
  };
  

  return (
    <div
      className={`relative rounded-3xl p-7 border bg-white/[0.03] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors ${
        isPopular ? "border-white/30" : "border-white/20"
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl overflow-hidden" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl overflow-hidden" />

      {isPopular && (
  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
    Most popular
  </span>
)}

      <span className="inline-block bg-background text-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-slate-700">
        {course.type}
      </span>
      <h2 className="text-2xl font-bold text-text-primary mb-2">
        {course.name}
      </h2>
      <p className="text-text-secondary text-sm mb-6 min-h-[40px]">
        {course.description}
      </p>
      <div className="text-accent text-3xl font-extrabold mb-1">
        Rs. {course.price.toLocaleString()}
      </div>
      <div className="text-text-secondary text-sm mb-6">
        {course.lessonCount} lessons
      </div>
      {/* Features checklist - only show if features exist */}
      {course.features && course.features.length > 0 && (
        <ul className="mb-6 space-y-2">
          {course.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <span className="text-accent font-bold">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <button
  onClick={handleChoosePackage}
  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity"
>
  Choose Package
</button>
    </div>
  );
}

export default CoursePackageCard;
