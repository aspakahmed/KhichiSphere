import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#020617] text-slate-100">
      <Sidebar isMobileOpen={isSidebarOpen} onMobileClose={() => setIsSidebarOpen(false)} />
      <div className="dashboard-content min-h-[100dvh] min-w-0">
        <Navbar onMenuOpen={() => setIsSidebarOpen(true)} />
        <main className="w-full px-6 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-24 lg:pt-12 xl:px-14 2xl:px-16">
          <div className="mx-auto w-full max-w-[1420px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
