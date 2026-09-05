
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
      <div className="min-h-screen p-8 md:p-12">
        <div className="rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
          <h2 className="text-2xl font-bold text-white">
            Loading documents...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-12">
      {/* Page Header */}
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 mb-4">
          Instructor panel
        </span>

        <h1 className="text-4xl font-bold text-white mb-2">
          My{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
            documents
          </span>
        </h1>

        <p className="text-slate-400">
          Upload and manage your instructor documents.
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Upload Card */}
      <div className="mb-8 rounded-3xl border border-white/20 bg-white/[0.03] p-6 text-white shadow-2xl">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Upload Document
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Select a document from your device and upload it to your instructor
            profile.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Hidden File Input */}
          <input
            id="document-file"
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Choose File */}
          <label
            htmlFor="document-file"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)]/20 text-sky-300 border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/30 transition-colors cursor-pointer"
          >
            Choose File
          </label>

          {/* Selected File */}
          {selectedFile ? (
            <div className="flex-1 min-w-0 bg-[var(--color-background)] border border-white/10 rounded-lg px-3 py-2">
              <p className="text-sm text-white truncate">
                {selectedFile.name}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              No file selected
            </p>
          )}

          {/* Upload Button */}
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="rounded-3xl border border-white/20 bg-white/[0.03] overflow-hidden text-white shadow-2xl">
        {/* Section Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Uploaded Documents
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Documents currently uploaded to your instructor profile.
              </p>
            </div>

            <span className="rounded-full bg-white/[0.03] border border-white/20 px-3 py-1 text-sm text-slate-300">
              {documents.length}
            </span>
          </div>
        </div>

        {/* No Documents */}
        {documents.length === 0 ? (
          <div className="p-8">
            <p className="text-slate-400 text-center">
              No documents uploaded yet.
            </p>
          </div>
        ) : (
          /* Documents List */
          <div className="divide-y divide-white/10">
            {documents.map((document, index) => (
              <div
                key={document._id || index}
                className="p-5 transition-colors hover:bg-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Document Information */}
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">
                      {document.fileName}
                    </p>

                    <p className="mt-1 text-sm text-slate-400 break-all">
                      {document.filePath}
                    </p>
                  </div>

                  {/* Document Status */}
                  <span className="shrink-0 inline-flex w-fit rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                    Uploaded
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InstructorDocumentsPage;

