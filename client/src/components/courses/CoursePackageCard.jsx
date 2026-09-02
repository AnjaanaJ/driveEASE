import { useNavigate } from "react-router-dom";

function CoursePackageCard({ course }) {
  const navigate = useNavigate();

  const handleChoosePackage = () => {
    navigate(`/student/register-profile?course=${course._id}`);
  };

  return (
    <div className="bg-surface border border-slate-700 rounded-2xl p-7 hover:border-accent transition-all hover:-translate-y-1 shadow-lg">
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
