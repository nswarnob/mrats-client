import React from "react";
import { FiPlayCircle } from "react-icons/fi";
import PrimaryButton from "../ui/PrimaryButton";
import StatCard from "../ui/StatCard";
import LoanCard from "../ui/LoanCard";
import AboutUs from "../ui/AboutUs";
import Contact from "../ui/Contact";

const HomePage = () => {
  const loans = [
    {
      id: 1,
      title: "Small Business Booster",
      category: "Business",
      interest: "9.5% APR",
      maxLimit: "$5,000",
    },
    {
      id: 2,
      title: "Education Support",
      category: "Education",
      interest: "7.2% APR",
      maxLimit: "$3,000",
    },
    {
      id: 3,
      title: "Emergency Relief",
      category: "Personal",
      interest: "8.0% APR",
      maxLimit: "$2,000",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
            Microloan Management
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
            Get Microloans, <span className="text-[#6B4DF8]">Fast</span> and
            Easy.
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            LoanLink helps NGOs and microfinance teams manage loan requests,
            approvals, EMI schedules and repayments in one simple dashboard.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <PrimaryButton>
              Apply for Loan
              <FiPlayCircle className="text-base" />
            </PrimaryButton>
            <button className="text-xs font-semibold text-[#6B4DF8]">
              Explore Loans
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-linear-to-br from-[#6B4DF8] to-[#A787FF] p-6 text-purple-50 shadow-xl shadow-purple-400/40">
          <h3 className="text-sm font-semibold">Live Portfolio Snapshot</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <StatCard label="Active Loans" value="428" />
            <StatCard label="Total Disbursed" value="$215K" />
            <StatCard label="Approval Rate" value="92%" />
            <StatCard label="On-Time Repayments" value="88%" />
          </div>
        </div>
      </section>
      {/* Available Loans */}
      <section className="mt-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Available Loans
            </h2>
            <p className="text-xs text-slate-500">
              Loaded from MongoDB – showing featured microloan products.
            </p>
          </div>
          <button className="text-xs font-semibold text-[#6B4DF8]">
            View All
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {loans.map((loan) => (
            <LoanCard key={loan.id} {...loan} onView={() => {}} />
          ))}
        </div>
      </section>
      {/* How it works */}
      <section className="mt-14 rounded-3xl bg-white p-6 shadow-lg shadow-purple-200/70">
        <h2 className="text-xl font-semibold text-slate-900">
          How LoanLink Works
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {["Request", "Review & Verify", "Approve & Track"].map(
            (step, idx) => (
              <div key={step} className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-[#6B4DF8]">
                  {idx + 1}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">
                  {step}
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  sed.
                </p>
              </div>
            )
          )}
        </div>
      </section>
      /About Us
      <section>
        <AboutUs></AboutUs>
      </section>
      <section>
        <Contact></Contact>
      </section>
    </div>
  );
};

export default HomePage;
