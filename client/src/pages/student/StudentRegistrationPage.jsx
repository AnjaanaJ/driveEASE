import { useNavigate } from "react-router-dom";
import { createStudent } from "../../api/studentApi";
import StudentForm from "../../components/students/StudentForm";

function StudentRegistrationPage() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    await createStudent(formData);
    navigate("/student/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 p-6 bg-surface border border-slate-700 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6 text-text-primary">
        Student Registration
      </h1>

      <StudentForm onSubmit={handleRegister} submitLabel="Register" />
    </div>
  );
}

export default StudentRegistrationPage;