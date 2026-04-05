import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider";
import ThemeControler from "../../ui/ThemeController";
import { motion, AnimatePresence } from "framer-motion";

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
    `relative text-sm font-medium transition-colors ${
      isActive ? "text-[#6B4DF8]" : "text-slate-700 dark:text-slate-300 hover:text-[#6B4DF8]"
    } ${isActive ? "after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-linear-to-r after:from-[#6B4DF8] after:to-[#A787FF]" : ""}`;

  return (
    <header className="sticky top-0 z-50 border-b border-purple-100/40 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm dark:shadow-purple-500/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-r from-[#6B4DF8] to-[#A787FF] text-white font-bold shadow-lg shadow-purple-500/30"
            >
              L
            </motion.div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Loan<span className="gradient-text">Link</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="flex items-center gap-8"
          >
            {[
              { to: "/", label: "Home", end: true },
              { to: "/all-loans", label: "All Loans" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <motion.div
                key={link.to}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <NavLink to={link.to} className={navLinkClass} end={link.end}>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>

          {/* Right section */}
          <div className="flex items-center gap-4 border-l border-purple-100/40 dark:border-white/10 pl-8">
            {user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/dashboard/profile"
                    className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-purple-100 hover:ring-2 hover:ring-purple-300 transition-all duration-300 dark:bg-white/10"
                    title="Profile"
                  >
                    <img
                      src={user?.photoURL || "/default-avatar.png"}
                      className="h-full w-full object-cover"
                      alt="avatar"
                    />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-red-200/50 dark:border-red-500/30 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/10 transition-colors duration-300"
                >
                  <FiLogOut className="text-sm" />
                  Logout
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <Link
                  to="/login"
                  className="rounded-full border border-purple-200/50 dark:border-white/10 px-4 py-2 text-xs font-semibold text-[#6B4DF8] hover:bg-purple-50/50 dark:hover:bg-white/5 transition-all duration-300"
                >
                  Login
                </Link>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
                  >
                    Register
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ThemeControler />
            </motion.div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.div
          className="flex items-center gap-2 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ThemeControler />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen((p) => !p)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-200/50 dark:border-white/10 text-slate-700 dark:text-slate-100 hover:bg-purple-50/50 dark:hover:bg-white/5 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Drawer with animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-purple-100/40 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 space-y-2">
              {[
                { to: "/", label: "Home", end: true },
                { to: "/all-loans", label: "All Loans" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link, idx) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-purple-100/50 dark:bg-purple-900/30 text-[#6B4DF8] font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-purple-50/50 dark:hover:bg-white/5"
                      }`
                    }
                    end={link.end}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                className="border-t border-purple-100/40 dark:border-white/10 pt-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-purple-50/50 dark:hover:bg-white/5 transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-2"
                    >
                      <div className="h-8 w-8 overflow-hidden rounded-full bg-purple-100 dark:bg-white/10">
                        <img
                          src={user?.photoURL || "/default-avatar.png"}
                          className="h-full w-full object-cover"
                          alt="avatar"
                        />
                      </div>
                      <span className="text-slate-800 dark:text-slate-100 font-medium">
                        {user?.displayName || "Profile"}
                      </span>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="w-full rounded-full border border-red-200/50 dark:border-red-500/30 px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/10 transition-colors duration-300"
                    >
                      Logout
                    </motion.button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="flex-1 text-center rounded-full border border-purple-200/50 dark:border-white/10 px-4 py-2 text-xs font-semibold text-[#6B4DF8] hover:bg-purple-50/50 dark:hover:bg-white/5 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="flex-1 text-center rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-4 py-2 text-xs font-semibold text-white"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
