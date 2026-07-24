import { ChevronDown, ChevronLeft, ChevronRight, Inbox, Plus } from "lucide-react";

function Panel({ children, className = "" }) {
  return <section className={`rounded-2xl border border-slate-800/90 bg-slate-900/45 shadow-[0_18px_50px_rgba(0,0,0,0.12)] ${className}`}>{children}</section>;
}

function PageHeader({ eyebrow, title, subtitle, actionLabel, onAction }) {
  return <div className="flex flex-col justify-between gap-6 border-b border-slate-800/60 pb-7 sm:flex-row sm:items-end sm:pb-8"><div className="min-w-0"><p className="text-sm font-medium text-cyan-300">{eyebrow}</p><h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">{title}</h1><p className="mt-2.5 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">{subtitle}</p></div>{actionLabel && <button onClick={onAction} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"><Plus size={17} />{actionLabel}</button>}</div>;
}

function StatCard({ label, value, detail, icon: Icon, tone = "bg-cyan-400/10 text-cyan-300" }) {
  return <Panel className="p-5 sm:p-5.5"><div className={`inline-flex rounded-xl p-2.5 ${tone}`}><Icon size={19} /></div><p className="mt-5 text-sm text-slate-400">{label}</p><p className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p></Panel>;
}

function FilterButton({ children }) {
  return <button className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/55 px-3 py-2 text-sm text-slate-300 transition hover:border-slate-700 hover:bg-slate-800/70">{children}<ChevronDown size={15} className="text-slate-500" /></button>;
}

function StatusBadge({ children, tone = "cyan" }) {
  const styles = { cyan: "bg-cyan-400/10 text-cyan-300", green: "bg-emerald-400/10 text-emerald-300", blue: "bg-blue-400/10 text-blue-300", violet: "bg-violet-400/10 text-violet-300", slate: "bg-slate-400/10 text-slate-300", red: "bg-red-400/10 text-red-300", amber: "bg-amber-400/10 text-amber-300" };
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[tone]}`}>{children}</span>;
}

function EmptyState({ title = "Nothing here yet", description = "Create a new record to get started.", actionLabel }) {
  return <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300"><Inbox size={22} /></div><h2 className="mt-5 text-lg font-semibold text-white">{title}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">{description}</p>{actionLabel && <button className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950"><Plus size={16} />{actionLabel}</button>}</div>;
}

function LoadingSkeleton({ rows = 4 }) {
  return <div className="space-y-3 p-5">{Array.from({ length: rows }).map((_, index) => <div className="flex items-center gap-4" key={index}><div className="h-9 w-9 animate-pulse rounded-lg bg-slate-800" /><div className="flex-1 space-y-2"><div className="h-3 w-1/3 animate-pulse rounded bg-slate-800" /><div className="h-2.5 w-1/4 animate-pulse rounded bg-slate-800/80" /></div></div>)}</div>;
}

function Pagination({ summary = "Showing 1–6 of 128 results" }) {
  return <div className="flex flex-col gap-3 border-t border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-slate-500">{summary}</p><div className="flex items-center gap-1"><button className="rounded-lg border border-slate-800 p-2 text-slate-500" aria-label="Previous page"><ChevronLeft size={16} /></button><button className="rounded-lg bg-cyan-400 px-3 py-1.5 text-sm font-medium text-slate-950">1</button><button className="rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:bg-slate-800">2</button><button className="rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:bg-slate-800">3</button><span className="px-1 text-slate-600">…</span><button className="rounded-lg px-3 py-1.5 text-sm text-slate-400 hover:bg-slate-800">12</button><button className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:bg-slate-800" aria-label="Next page"><ChevronRight size={16} /></button></div></div>;
}

export { EmptyState, FilterButton, LoadingSkeleton, PageHeader, Pagination, Panel, StatCard, StatusBadge };
