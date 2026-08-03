import { useState } from "react";
import { Bell, Command, Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Navbar({ onMenuOpen }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const initials = user?.full_name?.split(" ").map((name) => name[0]).join("").slice(0, 2) || "KS";
  const handleSearch = (event) => {
    event.preventDefault();
    const value = query.trim().toLowerCase();
    if (!value) return;
    const destination = value.includes("candidate") ? "/candidates" : value.includes("company") ? "/companies" : value.includes("application") ? "/applications" : value.includes("resume") || value.includes("ai") ? "/resume-ai" : value.includes("analytic") || value.includes("report") ? "/analytics" : "/jobs";
    navigate(destination);
    setQuery("");
  };

  return (
    <header className="sticky top-0 z-20 h-[4.5rem] border-b border-slate-800/80 bg-[#020617]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-full max-w-[1580px] items-center gap-4 px-5 sm:px-7 lg:px-10 xl:px-12 2xl:px-14">
        <button onClick={onMenuOpen} className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-slate-100 lg:hidden" aria-label="Open navigation">
          <Menu size={20} />
        </button>

        <form onSubmit={handleSearch} className="relative hidden w-full max-w-[34rem] md:block">
          <Search size={17} strokeWidth={1.9} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500" />
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search workspace" placeholder="Find jobs, candidates, companies..." style={{ paddingLeft: "2.9rem", paddingRight: "4.5rem" }} className="h-10 w-full rounded-xl border border-slate-800 bg-slate-900/65 text-sm text-slate-200 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10" />
          <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md border border-slate-700/90 bg-slate-800/90 px-2 py-1 text-[10px] font-medium leading-none text-slate-500"><Command size={10} />K</span>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 transition hover:border-slate-700 hover:text-slate-100" aria-label="Notifications">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
          </button>
          <Link to="/profile" className="flex min-w-0 items-center gap-3 border-l border-slate-800 pl-4 transition hover:opacity-85">
            <div className="hidden max-w-44 text-right sm:block">
              <p className="truncate text-sm font-medium leading-5 text-slate-200">{user?.full_name || "Workspace admin"}</p>
              <p className="truncate text-xs capitalize leading-4 text-slate-500">{user?.role || "Recruitment"}</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/15 bg-cyan-400/15 text-xs font-bold text-cyan-300">{initials}</div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
