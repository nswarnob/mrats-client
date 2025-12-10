import React, { useContext, useState, useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { dashboardMenu } from "../Components/Dashboard/DashboardMenuConfig";
import SidebarItem from "../Components/Dashboard/SidebarItem";

const DashboardLayout = () => {
  const { user, userRole, logOut } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const buttonRef = useRef(null);

  // userRole = "admin" | "manager" | "borrower"
  const role = userRole || user?.role || "borrower";

  // Build final menu
  const sidebarItems = [...dashboardMenu[role], ...dashboardMenu.common];

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
      }
    };
    if (drawerOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [drawerOpen]);

  // Focus trap: move focus to drawer when opened
  useEffect(() => {
    if (drawerOpen && drawerRef.current) {
      // Focus the first interactive element in the drawer
      const firstFocusable = drawerRef.current.querySelector("a, button");
      if (firstFocusable) {
        firstFocusable.focus();
      }
    } else if (!drawerOpen && buttonRef.current) {
      // Return focus to hamburger button when drawer closes
      buttonRef.current.focus();
    }
  }, [drawerOpen]);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1A1528] to-[#2D1F47] text-purple-50">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-[#1A1528]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <span className="text-sm font-semibold tracking-wide">
            Loan<span className="text-purple-300">Link</span> Dashboard
          </span>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
            className="md:hidden text-purple-300 hover:text-purple-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {drawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Role + Logout */}
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-white/5 px-3 py-1 capitalize">
              {role}
            </span>
            <button
              className="flex items-center gap-1 text-red-300 hover:text-red-200 transition-colors"
              onClick={handleLogout}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 top-[57px] md:hidden bg-black/40 backdrop-blur-sm z-30 transition-opacity"
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <nav
        id="mobile-drawer"
        ref={drawerRef}
        className={`fixed top-[57px] left-0 h-[calc(100vh-57px)] w-60 bg-white/5 text-xs md:hidden z-40 transform transition-transform duration-300 ease-in-out rounded-r-2xl ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-1 overflow-y-auto h-full">
          {sidebarItems.map((item) => (
            <div key={item.to} onClick={closeDrawer}>
              <SidebarItem {...item} />
            </div>
          ))}
        </div>
      </nav>

      {/* BODY */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        {/* SIDEBAR - Desktop Only */}
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
