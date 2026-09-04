import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";

function InstructorDocumentsPage() {
  const [instructorId, setInstructorId] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axiosInstance.get("/instructors/me");

      const instructor = response.data?.data;

      if (!instructor?._id) {
        throw new Error("Instructor ID not found");
      }

      setInstructorId(instructor._id);
      setDocuments(instructor.documents || []);
    } catch (err) {
      console.error("Error fetching documents:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load documents"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file || null);
    setMessage("");
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setError("");

      const formData = new FormData();
      formData.append("document", selectedFile);

      const response = await axiosInstance.post(
        `/instructors/${instructorId}/documents`,
        formData
      );

      setDocuments(response.data?.data || []);

      setSelectedFile(null);

      document.getElementById("document-file").value = "";

      setMessage("Document uploaded successfully.");
    } catch (err) {
      console.error("Error uploading document:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to upload document"
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-bold">
          Loading documents...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">
        My Documents
      </h2>

      <p className="mb-5">
        Upload and manage your instructor documents.
      </p>

      {message && (
        <p className="text-green-600 mb-4">
          {message}
        </p>
      )}

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      <div className="mb-6">
        <input
          id="document-file"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />

        <label
          htmlFor="document-file"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          Choose File
        </label>

        {selectedFile && (
          <span className="ml-3">
            {selectedFile.name}
          </span>
        )}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">
        Uploaded Documents
      </h3>

      {documents.length === 0 ? (
        <div className="border border-gray-300 rounded-lg p-4">
          <p>No documents uploaded yet.</p>
        </div>
      ) : (
        <div>
          {documents.map((document, index) => (
            <div
              key={document._id || index}
              className="mb-4 p-4 border border-gray-300 rounded-lg"
            >
              <strong>{document.fileName}</strong>

              <p className="mt-2">
                File path: {document.filePath}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InstructorDocumentsPage;