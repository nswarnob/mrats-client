import React, { useContext } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = ({ onToggleTheme, darkMode }) => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-purple-100/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-r from-[#6B4DF8] to-[#A787FF] text-white font-bold">
            L
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Loan<span className="text-[#6B4DF8]">Link</span>
          </span>
        </div>

        {/* Links */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <a href="/" className="hover:text-[#6B4DF8]">
            Home
          </a>
          <a href="/all-loans" className="hover:text-[#6B4DF8]">
            All Loans
          </a>
          <a href="/about" className="hover:text-[#6B4DF8]">
            About Us
          </a>
          <a href="/contact" className="hover:text-[#6B4DF8]">
            Contact
          </a>

          {user ? (
            <>
              <a href="/dashboard" className="hover:text-[#6B4DF8]">
                Dashboard
              </a>
              <Link
                to={"/dashboard/profile"}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700"
              >
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  className="rounded-full"
                  alt=""
                />
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="login"
                className="rounded-full border border-purple-200 px-4 py-1.5 text-xs font-semibold text-[#6B4DF8] hover:bg-purple-50"
              >
                Login
              </Link>
              <a
                href="/register"
                className="rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-purple-300/60"
              >
                Register
              </a>
            </>
          )}

          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
