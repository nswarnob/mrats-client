import React from "react";
import {
  FiHome,
  FiUsers,
  FiCreditCard,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";

const DashboardLayout = ({ children, role = "admin" }) => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#1A1528] to-[#281A3F] text-purple-50">
      {/* Top bar */}
      <header className="border-b border-white/10 bg-[#1A1528]/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold">
            Loan<span className="text-purple-300">Link</span> Dashboard
          </span>
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-white/5 px-3 py-1 capitalize">
              {role}
            </span>
            <button className="flex items-center gap-1 text-red-300">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6">
        {/* Sidebar */}
        <aside className="hidden w-56 shrink-0 rounded-2xl bg-white/5 p-4 text-xs md:block">
          <nav className="space-y-1">
            <SidebarItem icon={<FiHome />} label="Overview" active />
            {role === "admin" && (
              <>
                <SidebarItem icon={<FiUsers />} label="Manage Users" />
                <SidebarItem icon={<FiCreditCard />} label="All Loan" />
              </>
            )}
            {role === "manager" && (
              <>
                <SidebarItem icon={<FiPlus />} label="Add Loan" />
                <SidebarItem icon={<FiCreditCard />} label="Manage Loans" />
              </>
            )}
          </nav>
        </aside>

        {/* Main */}
        <section className="flex-1 rounded-2xl bg-white p-5 text-slate-900 shadow-xl shadow-black/20">
          {children}
        </section>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active }) => (
  <button
    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left ${
      active
        ? "bg-linear-to-r from-[#6B4DF8] to-[#A787FF] text-white shadow-md shadow-purple-500/40"
        : "text-purple-100 hover:bg-white/10"
    }`}
  >
    <span className="text-sm">{icon}</span>
    <span>{label}</span>
  </button>
);

export default DashboardLayout;
