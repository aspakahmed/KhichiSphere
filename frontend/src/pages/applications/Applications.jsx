import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Search,
  Users,
  X,
} from "lucide-react";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import {
  EmptyState,
  LoadingSkeleton,
  PageHeader,
  Panel,
  StatCard,
  StatusBadge,
} from "@/components/recruitment/EnterpriseUi";
import {
  getApplications,
  updateApplicationStatus,
} from "@/services/applicationService";

const statuses = [
  "Pending",
  "Screening",
  "Shortlisted",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
];

const statusTones = {
  Pending: "amber",
  Screening: "blue",
  Shortlisted: "violet",
  Interview: "cyan",
  Offer: "amber",
  Hired: "green",
  Rejected: "red",
};

function ApplicationDrawer({
  application,
  onClose,
  onStatusUpdated,
}) {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  if (!application) return null;

  const handleStatusChange = async (event) => {
    const status = event.target.value;

    setError("");
    setUpdating(true);

    try {
      const updatedApplication = await updateApplicationStatus(
        application.id,
        status
      );

      onStatusUpdated(updatedApplication);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Unable to update application status."
      );
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-sm"
        aria-label="Close application details"
      />

      <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto border-l border-slate-800 bg-[#07101f] shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-800 bg-[#07101f]/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-sm font-medium text-cyan-300">
              Application details
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              {application.user.full_name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <Panel className="p-5">
            <p className="text-sm text-slate-500">Candidate</p>
            <h3 className="mt-1 font-medium text-white">
              {application.user.full_name}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {application.user.email}
            </p>
          </Panel>

          <Panel className="p-5">
            <p className="text-sm text-slate-500">Applied job</p>
            <h3 className="mt-1 font-medium text-white">
              {application.job.title}
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              {application.job.company} · {application.job.location}
            </p>
          </Panel>

          <Panel className="p-5">
            <h3 className="font-medium text-white">
              Application status
            </h3>

            <select
              value={application.status}
              onChange={handleStatusChange}
              disabled={updating}
              className="mt-4 h-11 w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 text-sm text-white outline-none focus:border-cyan-400/50 disabled:opacity-60"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {updating && (
              <p className="mt-3 text-sm text-cyan-300">
                Updating status...
              </p>
            )}

            {error && (
              <p className="mt-3 text-sm text-red-300">
                {error}
              </p>
            )}
          </Panel>
        </div>
      </aside>
    </>
  );
}

function Applications() {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load applications from the server.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return applications;

    return applications.filter((application) =>
      [
        application.user?.full_name,
        application.user?.email,
        application.job?.title,
        application.job?.company,
        application.status,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(query)
        )
    );
  }, [applications, search]);

  const hiredCount = applications.filter(
    (application) => application.status === "Hired"
  ).length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const handleStatusUpdated = (updatedApplication) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === updatedApplication.id
          ? updatedApplication
          : application
      )
    );

    setSelected(updatedApplication);
  };

  return (
    <DashboardLayout>
      <PageHeader
        eyebrow="Applicant tracking system"
        title="Applications"
        subtitle="Manage real candidate applications and hiring stages."
      />

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total applications"
          value={applications.length}
          detail="Applications in the platform"
          icon={FileText}
        />

        <StatCard
          label="Candidates"
          value={
            new Set(
              applications.map(
                (application) => application.user?.id
              )
            ).size
          }
          detail="Unique candidates"
          icon={Users}
          tone="bg-blue-400/10 text-blue-300"
        />

        <StatCard
          label="Interviews"
          value={interviewCount}
          detail="Candidates in interview stage"
          icon={Users}
          tone="bg-violet-400/10 text-violet-300"
        />

        <StatCard
          label="Hired"
          value={hiredCount}
          detail="Successful applications"
          icon={CheckCircle2}
          tone="bg-emerald-400/10 text-emerald-300"
        />
      </div>

      <Panel className="mt-6 overflow-hidden">
        <div className="border-b border-slate-800 p-4">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search candidate, job, or company..."
              className="h-10 w-full rounded-lg border border-slate-800 bg-slate-950/40 pl-10 pr-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <EmptyState
            title="Unable to load applications"
            description={error}
          />
        ) : filteredApplications.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-950/25 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-3.5">Candidate</th>
                  <th className="px-4 py-3.5">Job</th>
                  <th className="px-4 py-3.5">Company</th>
                  <th className="px-4 py-3.5">Location</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b border-slate-800/70 transition hover:bg-slate-800/25"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-200">
                        {application.user.full_name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {application.user.email}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-slate-300">
                      {application.job.title}
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      {application.job.company}
                    </td>

                    <td className="px-4 py-4 text-slate-400">
                      {application.job.location}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge
                        tone={
                          statusTones[application.status] || "slate"
                        }
                      >
                        {application.status}
                      </StatusBadge>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(application)}
                        className="rounded-lg px-3 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/10"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title={
              search
                ? "No matching applications found"
                : "No applications found"
            }
            description={
              search
                ? "Try a different candidate, job, or company."
                : "Candidate applications will appear here."
            }
          />
        )}
      </Panel>

      <ApplicationDrawer
        application={selected}
        onClose={() => setSelected(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </DashboardLayout>
  );
}

export default Applications;