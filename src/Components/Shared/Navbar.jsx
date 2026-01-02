import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider";
import ThemeControler from "../../ui/ThemeController";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-[#6B4DF8] ${
      isActive ? "text-[#6B4DF8]" : "text-primary"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-purple-100/40 bg-white/80 backdrop-blur dark:bg-white/5 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-r from-[#6B4DF8] to-[#A787FF] text-white font-bold">
            L
          </div>
          <span className="text-lg font-semibold tracking-tight text-primary dark:text-slate-100">
            Loan<span className="text-[#6B4DF8]">Link</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/all-loans" className={navLinkClass}>
            All Loans
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <Link
                to="/dashboard/profile"
                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-purple-100 text-xs font-semibold text-purple-700 ring-1 ring-purple-200/50 dark:bg-white/10 dark:text-slate-100 dark:ring-white/10"
                title="Profile"
              >
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  className="h-full w-full object-cover"
                  alt="avatar"
                />
              </Link>

              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-full border border-purple-200 px-4 py-1.5 text-xs font-semibold text-[#6B4DF8] hover:bg-purple-50 dark:border-white/10 dark:hover:bg-white/10"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-purple-300/60"
              >
                Register
              </NavLink>
            </>
          )}

          {/* Theme Toggle */}
          <div>
            <ThemeControler></ThemeControler>
          </div>
        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Theme toggle on mobile too */}
          <div>
            <ThemeControler></ThemeControler>
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-slate-700 hover:bg-purple-50 transition
                       dark:border-white/10 dark:text-slate-100 dark:hover:bg-white/10"
            aria-label="Toggle menu"
            title="Menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-purple-100/40 dark:border-white/10 bg-white/90 backdrop-blur dark:bg-[#0F0A1A]/95">
          <div className="mx-auto max-w-6xl px-4 py-4 space-y-3 space-x-1 text-sm">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/all-loans"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              All Loans
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              Contact
            </NavLink>

            <div className="pt-2 border-t border-purple-100/40 dark:border-white/10" />

            {user ? (
              <div className="flex items-center justify-between">
                <Link
                  to="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-purple-100 ring-1 ring-purple-200/50 dark:bg-white/10 dark:ring-white/10">
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      className="h-full w-full object-cover"
                      alt="avatar"
                    />
                  </div>
                  <span className="text-slate-800 dark:text-slate-100">
                    {user?.displayName || "My Profile"}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-full border border-red-200 px-4 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50
                             dark:border-red-500/30 dark:hover:bg-red-500/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-1/2 text-center rounded-full border border-purple-200 px-4 py-2 text-xs font-semibold text-[#6B4DF8] hover:bg-purple-50
                             dark:border-white/10 dark:hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="w-1/2 text-center rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-purple-300/60"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
