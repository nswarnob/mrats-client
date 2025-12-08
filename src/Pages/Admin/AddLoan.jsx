import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import PrimaryButton from "../../ui/PrimaryButton";

const AddLoan = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Add Loan</h1>
      <p className="mt-1 text-xs text-slate-500">
        Create a new microloan product for borrowers.
      </p>

      <form className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-slate-700">
            Loan Title
          </label>
          <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">Category</label>
          <select className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200">
            <option>Business</option>
            <option>Education</option>
            <option>Personal</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">
            Interest Rate
          </label>
          <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700">
            Max Loan Limit
          </label>
          <input className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Description
          </label>
          <textarea className="mt-1 w-full rounded-xl border border-purple-100 bg-purple-50/30 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200" />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="showOnHome" className="h-4 w-4" />
          <label htmlFor="showOnHome" className="text-xs text-slate-700">
            Show on Home page
          </label>
        </div>
        <div className="md:col-span-2 mt-2 flex justify-end">
          <PrimaryButton>Save Loan</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default AddLoan;
