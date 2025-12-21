import React from "react";
import { FiPlayCircle } from "react-icons/fi";
import PrimaryButton from "../ui/PrimaryButton";
import StatCard from "../ui/StatCard";
import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
          Microloan Management
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-3 text-3xl heading text-slate-900 md:text-4xl"
        >
          Get Microloans, <span className="text-[#6B4DF8]">Fast</span> and Easy.
        </motion.h1>
        <p className="mt-3 text-sm text-slate-600">
          LoanLink helps NGOs and microfinance teams manage loan requests,
          approvals, EMI schedules and repayments in one simple dashboard.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link to={"/dashboard/apply-loan"}>
            <PrimaryButton>
              Apply for Loan
              <FiPlayCircle className="text-base" />
            </PrimaryButton>
          </Link>

          <Link
            to={"/all-loans"}
            className="text-xs font-semibold text-[#6B4DF8]"
          >
            Explore Loans
          </Link>
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
    </div>
  );
};

export default Hero;
