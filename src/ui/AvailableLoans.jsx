import React from "react";
import { motion } from "framer-motion";
import LoanCard from "../ui/LoanCard";
import { Link } from "react-router";

const AvailableLoans = () => {
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
      {" "}
      <div className="mt-20">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-slate-900 text-center"
          >
            Available <span className="text-[#6B4DF8]">Loans</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-4 max-w-2xl mx-auto text-center text-slate-600 text-sm md:text-base"
          >
            Loaded from MongoDB – showing featured microloan products.
          </motion.p>
        </div>

        <Link
          to={"/all-loans"}
          className="text-xs font-semibold text-[#6B4DF8]"
        >
          View All
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {loans.map((loan) => (
          <LoanCard key={loan.id} {...loan} onView={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default AvailableLoans;
