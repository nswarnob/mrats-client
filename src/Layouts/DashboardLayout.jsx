import React, { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { dashboardMenu } from "../Components/Dashboard/DashboardMenuConfig";
import SidebarItem from "../Components/Dashboard/SidebarItem";

const DashboardLayout = () => {
  const { user, userRole, logOut } = useContext(AuthContext);

  // userRole = "admin" | "manager" | "borrower"
  const role = userRole || user?.role || "borrower";

  // Build final menu
  const sidebarItems = [...dashboardMenu[role], ...dashboardMenu.common];

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1A1528] to-[#2D1F47] text-purple-50">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#1A1528]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <span className="text-sm font-semibold tracking-wide">
            Loan<span className="text-purple-300">Link</span> Dashboard
          </span>

          {/* Role + Logout */}
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-white/5 px-3 py-1 capitalize">
              {role}
            </span>
            <button
              className="flex items-center gap-1 text-red-300"
              onClick={handleLogout}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {/* SIDEBAR */}
        <aside className="hidden md:block w-60 shrink-0 rounded-2xl bg-white/5 p-4 text-xs">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.to} {...item} />
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 rounded-2xl bg-white p-6 shadow-2xl shadow-black/20 text-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
