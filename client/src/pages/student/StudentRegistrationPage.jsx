import { useNavigate } from "react-router-dom";
import { createStudent } from "../../api/studentApi";
import StudentForm from "../../components/students/StudentForm";
import { useAuth } from "../../context/AuthContext";

function StudentRegistrationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleRegister = async (formData) => {
    const payload = {
      ...formData,
      userId: formData.userId || user?._id || user?.id,
    };

    await createStudent(payload);
    navigate("/pending-approval");
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-surface border border-slate-700 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-text-primary">
        Student Registration
      </h1>

      <StudentForm
        initialData={{ userId: user?._id || user?.id || "" }}
        onSubmit={handleRegister}
        submitLabel="Register"
        showUserId={false}
      />
    </div>
  );
}

export default StudentRegistrationPage;