import React from "react";
import MainLayout from "../Layouts/MainLayout";
import PrimaryButton from "../ui/PrimaryButton";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div>
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-1 text-xs text-slate-500">
          Sign in to continue managing your microloans.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <PrimaryButton className="w-full justify-center mt-2">
            Login
          </PrimaryButton>
        </form>

        <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
          <div className="h-px flex-1 bg-purple-100" />
          <span>OR</span>
          <div className="h-px flex-1 bg-purple-100" />
        </div>

        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50">
          <FcGoogle className="text-base" />
          Continue with Google
        </button>

        <p className="mt-4 text-[11px] text-center text-slate-500">
          New here?{" "}
          <a href="/register" className="font-semibold text-[#6B4DF8]">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
