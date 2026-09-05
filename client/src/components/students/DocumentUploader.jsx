import { useState, useRef } from "react";
import { uploadStudentDocument } from "../../api/studentApi";

function DocumentUploader({ studentId, onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
  };


  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };


  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first");
      setIsError(true);
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      await uploadStudentDocument(studentId, selectedFile);
      setMessage("Document uploaded successfully!");
      setIsError(false);
      setSelectedFile(null);
       if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Upload failed. Please try again.";
      setMessage(errorMsg);
      setIsError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/20 bg-white/[0.03] backdrop-blur-3xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <h2 className="mb-3 text-lg font-extrabold text-white">Upload document</h2>
      <input
       ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="mb-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleChooseFileClick}
          className="rounded-lg border border-white/10 bg-background/70 px-4 py-2 text-sm font-medium text-text-primary transition hover:border-accent/40 hover:bg-white/5"
        >
          Choose file
        </button>
        <span className="truncate text-sm text-text-secondary">
          {selectedFile ? selectedFile.name : "No file chosen"}
        </span>
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            isError ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default DocumentUploader;
