import { useState } from "react";
import { BriefcaseBusiness, Loader2, X } from "lucide-react";
import { createJob } from "@/services/jobService";

const initialForm = {
  title: "",
  company: "",
  location: "",
  description: "",
  salary: "",
};

function CreateJobModal({ open, onClose, onCreated }) {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        salary: formData.salary ? Number(formData.salary) : null,
      };

      const createdJob = await createJob(payload);

      setFormData(initialForm);
      onCreated(createdJob);
      onClose();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Unable to create job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm sm:p-6">
      <div role="dialog" aria-modal="true" aria-labelledby="create-job-title" className="my-auto w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-400/10 p-2.5 text-cyan-300">
              <BriefcaseBusiness size={20} />
            </div>

            <div>
              <h2 id="create-job-title" className="text-lg font-semibold text-white">
                Create job
              </h2>
              <p className="text-sm text-slate-500">
                Add a new role to your hiring workspace.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close create job dialog"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div className="space-y-2"><label htmlFor="job-title" className="text-sm font-medium text-slate-300">Job title</label><input
            id="job-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job title"
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
            required
          /></div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><label htmlFor="job-company" className="text-sm font-medium text-slate-300">Company</label><input
              id="job-company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
              required
            /></div>

            <div className="space-y-2"><label htmlFor="job-location" className="text-sm font-medium text-slate-300">Location</label><input
              id="job-location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
              required
            /></div>
          </div>

          <div className="space-y-2"><label htmlFor="job-description" className="text-sm font-medium text-slate-300">Job description</label><textarea
            id="job-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job description"
            rows={5}
            className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
            required
          /></div>

          <div className="space-y-2"><label htmlFor="job-salary" className="text-sm font-medium text-slate-300">Salary <span className="font-normal text-slate-500">(optional)</span></label><input
            id="job-salary"
            name="salary"
            type="number"
            min="0"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary (optional)"
            className="h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
          /></div>

          {error && (
            <div className="rounded-xl border border-red-400/15 bg-red-500/10 p-3 text-sm text-red-300">
              {typeof error === "string"
                ? error
                : "Please check the job details."}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Creating..." : "Create job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobModal;
