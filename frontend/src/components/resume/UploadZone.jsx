import { useRef, useState } from "react";
import { FileUp, Loader2, Upload } from "lucide-react";

import { uploadResume } from "@/services/resumeService";
import { Panel } from "@/components/recruitment/EnterpriseUi";

const MAX_SIZE = 10 * 1024 * 1024;

export default function UploadZone({ onUploadSuccess }) {
  const inputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const validateFile = (file) => {
    if (!file) return false;

    const extension = file.name.split(".").pop().toLowerCase();

    if (!["pdf", "doc", "docx"].includes(extension)) {
      setError("Only PDF, DOC and DOCX files are allowed.");
      return false;
    }

    if (file.size > MAX_SIZE) {
      setError("Maximum file size is 10 MB.");
      return false;
    }

    return true;
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];

    setError("");

    if (!validateFile(file)) return;

    setFileName(file.name);
    setUploading(true);

    try {
      const response = await uploadResume(file);

      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to upload resume. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Panel className="border-dashed p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
        <Upload size={22} />
      </div>

      <h2 className="mt-5 text-lg font-semibold text-white">
        Upload Resume
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        Upload a PDF or DOCX resume and let KhichiSphere AI analyze the
        candidate automatically.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        hidden
        onChange={handleUpload}
      />

      <button
        onClick={openFilePicker}
        disabled={uploading}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <FileUp size={17} />
            Choose Resume
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-slate-500">
        Supported: PDF, DOC, DOCX • Maximum 10 MB
      </p>

      {fileName && (
        <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
          <p className="text-sm text-emerald-300">
            Uploaded: {fileName}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </Panel>
  );
}