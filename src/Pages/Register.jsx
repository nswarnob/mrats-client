import React from "react";
import MainLayout from "../Layouts/MainLayout";
import PrimaryButton from "../ui/PrimaryButton";

const Register = () => {
  return (
    <div>
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        <h1 className="text-2xl font-semibold text-slate-900">Register</h1>
        <p className="mt-1 text-xs text-slate-500">
          Create an account as borrower or manager.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-700">Name</label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Photo URL
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">Role</label>
            <select className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200">
              <option>Borrower</option>
              <option>Manager</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
            <p className="mt-1 text-[10px] text-slate-500">
              Must contain 1 uppercase, 1 lowercase and at least 6 characters.
            </p>
          </div>

          <PrimaryButton className="w-full justify-center mt-2">
            Create Account
          </PrimaryButton>
        </form>

        <p className="mt-4 text-[11px] text-center text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="font-semibold text-[#6B4DF8]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
