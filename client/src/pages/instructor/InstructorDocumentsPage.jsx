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
    return <div>Loading documents...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Documents</h1>

      <p>Upload and manage your instructor documents.</p>

      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div style={{ marginBottom: "25px" }}>
        <input
          id="document-file"
          type="file"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          style={{ marginLeft: "10px" }}
        >
          {uploading ? "Uploading..." : "Upload Document"}
        </button>
      </div>

      <h2>Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <div>
          {documents.map((document, index) => (
            <div
              key={document._id || index}
              style={{
                marginBottom: "15px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <strong>{document.fileName}</strong>

              <p>
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