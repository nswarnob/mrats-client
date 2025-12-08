import React from "react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-16 bg-[#1A1528] text-purple-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">
            Loan<span className="text-purple-300">Link</span>
          </h3>
          <p className="mt-3 text-xs text-purple-300">
            A modern microloan request & approval tracker for NGOs, MFIs and
            small financial organizations.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Useful Links</h4>
          <ul className="mt-3 space-y-1 text-xs text-purple-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/all-loans" className="hover:text-white">
                All Loans
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Connect</h4>
          <div className="mt-3 flex gap-3 text-xs">
            <a className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <FaXTwitter />
            </a>
            <a className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <FaFacebookF />
            </a>
            <a className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 text-center text-[11px] text-purple-400">
        © {new Date().getFullYear()} LoanLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
