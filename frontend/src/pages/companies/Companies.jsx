import { useEffect, useMemo, useState } from "react";
import { Building2, BriefcaseBusiness, MapPin, Search, Users } from "lucide-react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { EmptyState, LoadingSkeleton, PageHeader, Panel, StatCard } from "@/components/recruitment/EnterpriseUi";
import { getCompanies } from "@/services/recruitmentService";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch((err) => setError(err.response?.data?.detail || "Unable to load companies from the server."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? companies.filter((company) => [company.name, ...company.locations].some((value) => value?.toLowerCase().includes(query))) : companies;
  }, [companies, search]);

  const totalJobs = companies.reduce((sum, company) => sum + company.open_jobs, 0);
  const totalApplications = companies.reduce((sum, company) => sum + company.applications, 0);
  const locationCount = new Set(companies.flatMap((company) => company.locations)).size;

  return <DashboardLayout>
    <PageHeader eyebrow="Hiring network" title="Companies" subtitle="A live company directory built from your recruitment jobs and applications." />
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Companies" value={companies.length} detail="Organizations hiring" icon={Building2} />
      <StatCard label="Open jobs" value={totalJobs} detail="Roles across companies" icon={BriefcaseBusiness} tone="bg-blue-400/10 text-blue-300" />
      <StatCard label="Applications" value={totalApplications} detail="Candidate submissions" icon={Users} tone="bg-violet-400/10 text-violet-300" />
      <StatCard label="Locations" value={locationCount} detail="Hiring markets" icon={MapPin} tone="bg-emerald-400/10 text-emerald-300" />
    </div>
    <Panel className="mt-6 overflow-hidden">
      <div className="border-b border-slate-800 p-4"><div className="relative w-full lg:max-w-sm"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search company or location..." className="h-10 w-full rounded-lg border border-slate-800 bg-slate-950/40 pl-10 pr-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10" /></div></div>
      {loading ? <LoadingSkeleton rows={5} /> : error ? <EmptyState title="Unable to load companies" description={error} /> : filtered.length ? <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">{filtered.map((company) => <section key={company.name} className="rounded-xl border border-slate-800 bg-slate-950/25 p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Building2 size={19} /></div><h2 className="mt-4 font-semibold text-white">{company.name}</h2><p className="mt-2 text-sm text-slate-500">{company.locations.join(" · ") || "Location not specified"}</p><div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4"><div><p className="text-xs text-slate-500">Open jobs</p><p className="mt-1 text-lg font-semibold text-slate-200">{company.open_jobs}</p></div><div><p className="text-xs text-slate-500">Applications</p><p className="mt-1 text-lg font-semibold text-slate-200">{company.applications}</p></div></div></section>)}</div> : <EmptyState title={search ? "No matching companies" : "No companies found"} description={search ? "Try a different company or location." : "Companies are created automatically from real jobs."} />}
    </Panel>
  </DashboardLayout>;
}

export default Companies;
