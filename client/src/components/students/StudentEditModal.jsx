import { useState } from "react";
import StudentForm from "./StudentForm";
import { updateStudent, deleteStudent } from "../../api/studentApi";

function StudentEditModal({ student, onClose, onUpdated, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  if (!student) return null;

  // Called when the StudentForm inside this modal is submitted
   const handleSave = async (formData) => {
  const response = await updateStudent(student._id, formData);

  // The backend may respond with either the raw student object,
  // or a wrapper like { message, student }. Handle both shapes safely.
  const updatedStudent = response.student || response;

  onUpdated(updatedStudent);
  onClose();
};

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student? This cannot be undone.",
    );
    if (!confirmed) return;

    setDeleting(true);
    setDeleteError("");
    try {
      await deleteStudent(student._id);
      onDeleted(student._id); // tell the parent page to remove it from the list
      onClose();
    } catch (err) {
      setDeleteError(
        err.response?.data?.message || "Failed to delete student.",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    // Dark overlay background - clicking it closes the modal
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* stopPropagation so clicking inside the modal doesn't close it */}
      <div
        className="bg-background border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Edit Student</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-slate-300 hover:bg-white/10"
          >
            ✕
          </button>
        </div>

        {deleteError && (
          <div className="mb-4 p-3 bg-red-900/40 text-red-300 rounded border border-red-700 text-sm">
            {deleteError}
          </div>
        )}

        <StudentForm
          initialData={{
            ...student,
            // coursePackage may come back as a populated object ({ _id, name })
            // instead of a plain ID string — normalize it here so the dropdown matches
            coursePackage:
              student.coursePackage?._id || student.coursePackage || "",
          }}
          onSubmit={handleSave}
          submitLabel="Save Changes"
          showUserId={false}
        />

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="w-full mt-3 bg-red-600/20 text-red-300 border border-red-600/40 py-2 rounded hover:bg-red-600/30 transition disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete Student"}
        </button>
      </div>
    </div>
  );
}

export default StudentEditModal;
