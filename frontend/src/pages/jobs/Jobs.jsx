import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import CreateJobModal from "./CreateJobModal";
import {
  EmptyState,
  LoadingSkeleton,
  Panel,
  StatCard,
} from "@/components/recruitment/EnterpriseUi";
import { deleteJob, getJobs } from "@/services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadJobs = async () => {
    setError("");

    try {
      const data = await getJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to load jobs from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return jobs;
    }

    return jobs.filter((job) =>
      [job.title, job.company, job.location].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [jobs, search]);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(jobId);
    setError("");

    try {
      await deleteJob(jobId);
      setJobs((currentJobs) =>
        currentJobs.filter((job) => job.id !== jobId)
      );
    } catch (err) {
      console.error(err);
      setError("Unable to delete this job.");
    } finally {
      setDeletingId(null);
    }
  };
    const stats = [
    {
      label: "Total jobs",
      value: jobs.length,
      detail: "Jobs available in the platform",
      icon: BriefcaseBusiness,
    },
    {
      label: "Companies",
      value: new Set(jobs.map((job) => job.company)).size,
      detail: "Companies currently hiring",
      icon: Users,
      tone: "bg-blue-400/10 text-blue-300",
    },
    {
      label: "Locations",
      value: new Set(jobs.map((job) => job.location)).size,
      detail: "Hiring locations",
      icon: MapPin,
      tone: "bg-violet-400/10 text-violet-300",
    },
    {
      label: "Salaried roles",
      value: jobs.filter((job) => job.salary != null).length,
      detail: "Jobs with salary information",
      icon: BriefcaseBusiness,
      tone: "bg-emerald-400/10 text-emerald-300",
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-cyan-300">
            Hiring workspace
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Jobs
          </h1>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Manage real jobs available in your recruitment platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus size={17} />
          Create job
        </button>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-400/15 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <Panel className="mt-6 overflow-hidden">
        <div className="border-b border-slate-800 p-4">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs by title, company or location..."
              className="h-10 w-full rounded-lg border border-slate-800 bg-slate-950/40 pl-10 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>
        </div>
          {loading ? (
          <LoadingSkeleton rows={6} />
        ) : filteredJobs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-950/25 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-3.5">Position</th>
                  <th className="px-4 py-3.5">Company</th>
                  <th className="px-4 py-3.5">Location</th>
                  <th className="px-4 py-3.5">Salary</th>
                  <th className="px-4 py-3.5">Created by</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-slate-800/70 transition last:border-0 hover:bg-slate-800/25"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-semibold text-cyan-300">
                          {job.title
                            ?.split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-slate-200">
                            {job.title}
                          </p>

                          <p className="mt-0.5 max-w-xs truncate text-xs text-slate-500">
                            {job.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      {job.company}
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      {job.location}
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      {job.salary != null
                        ? `₹${Number(job.salary).toLocaleString("en-IN")}`
                        : "Not specified"}
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      User #{job.created_by}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(job.id)}
                        disabled={deletingId === job.id}
                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                        {deletingId === job.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
        <EmptyState
          title={search ? "No matching jobs found" : "No jobs found"}
          description={
            search
              ? "Try a different title, company, or location."
              : "Create your first job to begin building the hiring pipeline."
          }
        />
        )}
            </Panel>

      <CreateJobModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={(createdJob) =>
          setJobs((currentJobs) => [createdJob, ...currentJobs])
        }
      />
    </DashboardLayout>
  );
}

export default Jobs;