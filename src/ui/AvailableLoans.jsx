import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import LoanCard from "../ui/LoanCard";
import useLoans from "../hooks/useLoans";
import { FiArrowRight } from "react-icons/fi";

const AvailableLoans = () => {
  const { data: loans = [], isLoading } = useLoans();

  // ✅ Filter featured loans (showOnHome === true)
  const featuredLoans = useMemo(() => {
    const loansArray = Array.isArray(loans) ? loans : [];
    return loansArray.filter((loan) => loan.showOnHome === true).slice(0, 6);
  }, [loans]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-4 border-purple-200 border-t-purple-500 dark:border-purple-900/30 dark:border-t-purple-500"
        />
      </div>
    );
  }

  return (
    <motion.div
      className="mt-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div
        className="mb-12 flex flex-col gap-3 md:gap-5 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Featured Offers
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold leading-tight"
        >
          Available <span className="gradient-text">Loans</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-2 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          Here are our available loan options. Apply now and take the first step
          towards financial freedom!
        </motion.p>
      </motion.div>

      {/* Loans Grid */}
      {featuredLoans.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="py-12 text-center"
        >
          <div className="text-base text-slate-500 dark:text-slate-400">
            No loans found at the moment. Check back soon!
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {featuredLoans.map((loan) => (
            <LoanCard key={loan._id} {...loan} loan={loan} />
          ))}
        </motion.div>
      )}

      {/* View All Link */}
      <motion.div
        className="w-full text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/all-loans"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-purple-100/80 to-purple-50/80 dark:from-purple-900/30 dark:to-purple-800/20 text-sm font-semibold text-[#6B4DF8] hover:shadow-lg hover:shadow-purple-200/50 dark:hover:shadow-purple-500/20 transition-all duration-300 border border-purple-200/50 dark:border-purple-700/50"
        >
          View All Loans
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="group-hover:translate-x-1 transition-transform"
          >
            <FiArrowRight className="text-base" />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AvailableLoans;
