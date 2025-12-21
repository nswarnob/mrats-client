import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import LoanCard from "../ui/LoanCard";
import useLoans from "../hooks/useLoans";

const AvailableLoans = () => {
  const { data: loans = [], isLoading } = useLoans();

  // ✅ Filter featured loans (showOnHome === true)
  const featuredLoans = useMemo(() => {
    return loans.filter((loan) => loan.showOnHome === true).slice(0, 6); // show 6 on home
  }, [loans]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mt-20">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="w-full text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semi-bold text-slate-900 md:text-4xl"
          >
            Available <span className="text-[#6B4DF8]">Loans</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-2 text-sm text-slate-600 md:text-base"
          >
            Loaded from MongoDB – showing featured microloan products.
          </motion.p>
        </div>
      </div>

      {/* Loans grid */}
      {featuredLoans.length === 0 ? (
        <p className="text-center text-sm text-slate-500">No loans found.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredLoans.map((loan) => (
            <LoanCard key={loan._id} {...loan} loan={loan}/>
          ))}
        </div>
      )}

      <div className="w-full text-center mt-5 underline">
        <Link
          to="/all-loans"
          className="text-xs font-semibold text-[#6B4DF8] hover:underline"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default AvailableLoans;
