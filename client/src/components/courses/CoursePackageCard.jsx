import { useNavigate } from "react-router-dom";

function CoursePackageCard({ course }) {
  const navigate = useNavigate();
  const isPopular = course.type === "VIP";

  const handleChoosePackage = () => {
    navigate(`/student/register-profile?course=${course._id}`);
  };

  return (
    <div
      className={`relative bg-surface border rounded-2xl p-7 transition-all hover:-translate-y-1 shadow-lg ${
        isPopular
          ? "border-accent ring-1 ring-accent"
          : "border-slate-700 hover:border-accent"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md">
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
      <div className="text-gradient-brand text-3xl font-extrabold mb-1">
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
        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
      >
        Choose Package
      </button>
    </div>
  );
}

export default CoursePackageCard;
