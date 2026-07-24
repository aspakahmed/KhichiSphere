import {
  BriefcaseBusiness,
  BrainCircuit,
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/ui/Logo";

const menus = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Jobs", icon: BriefcaseBusiness, path: "/jobs" },
  { title: "Candidates", icon: Users, path: "/candidates" },
  { title: "Companies", icon: Building2, path: "/companies" },
  { title: "Applications", icon: FileText, path: "/applications" },
  { title: "Resume AI", icon: BrainCircuit, path: "/resume-ai" },
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar({ isMobileOpen, onMobileClose }) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const initials = user?.full_name?.split(" ").map((name) => name[0]).join("").slice(0, 2) || "KS";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = (
    <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-3">
      <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">Workspace</p>
      {menus.map(({ title, icon: Icon, path }) => (
        <NavLink
          key={title}
          to={path}
          onClick={onMobileClose}
          className={({ isActive }) => `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
            isActive
              ? "bg-cyan-400/10 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.12)]"
              : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-100"
          }`}
        >
          <Icon size={18} className="transition-transform duration-200 group-hover:scale-105" />
          {title}
        </NavLink>
      ))}
    </nav>
  );

  const profile = (
    <div className="m-3 mt-0 rounded-xl border border-slate-800 bg-slate-900/50 p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/15 text-xs font-bold text-cyan-300">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-200">{user?.full_name || "KhichiSphere"}</p>
          <p className="truncate text-xs capitalize text-slate-500">{user?.role || "Recruitment workspace"}</p>
        </div>
      </div>
      <button onClick={handleLogout} className="mt-3 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-slate-400 transition hover:bg-red-500/10 hover:text-red-300">
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );

  return (
    <>
      {isMobileOpen && <button onClick={onMobileClose} aria-label="Close navigation" className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-sm lg:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[17.5rem] flex-col lg:w-64 xl:w-[17.5rem] border-r border-slate-800/80 bg-[#020617]/95 pb-2 backdrop-blur-xl transition-transform duration-300 lg:z-30 lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-5 py-6">
          <Logo size="text-xl" />
          <button onClick={onMobileClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-900 hover:text-slate-200 lg:hidden" aria-label="Close navigation"><X size={18} /></button>
        </div>
        {navigation}
        {profile}
      </aside>
    </>
  );
}

export default Sidebar;
