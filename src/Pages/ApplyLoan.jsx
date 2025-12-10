import React from "react";
import PrimaryButton from "../ui/PrimaryButton";

const ApplyLoan = () => {
  return (
    <div>
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        <h1 className="text-2xl font-semibold text-slate-900">
          Apply for Loan
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Review your loan details and submit your microloan application.
        </p>

        <form className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Auto-filled */}
          <div>
            <label className="text-xs font-medium text-slate-700">
              Loan Title
            </label>
            <input
              disabled
              value="Small Business Booster"
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 text-sm text-slate-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Interest Rate
            </label>
            <input
              disabled
              value="9.5% APR"
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 text-sm text-slate-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Email (auto)
            </label>
            <input
              disabled
              value="user@example.com"
              className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 text-sm text-slate-500"
            />
          </div>

          {/* User fields */}
          <div>
            <label className="text-xs font-medium text-slate-700">
              First Name
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Last Name
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Contact Number
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              National ID / Passport
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Income Source
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-700">
              Monthly Income
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700">
              Loan Amount
            </label>
            <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Reason for Loan
            </label>
            <textarea className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Address
            </label>
            <textarea className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-slate-700">
              Extra Notes
            </label>
            <textarea className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
          </div>

          <div className="md:col-span-2 mt-2 flex justify-end">
            <PrimaryButton>Submit Application</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
