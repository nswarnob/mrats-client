import React from "react";
import { FiArrowRight } from "react-icons/fi";
import PrimaryButton from "./PrimaryButton";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LoanCard = ({ title, category, interest, maxLimit, onView, loan }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div className="relative h-full flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 dark:border-purple-900/30 overflow-hidden">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-50/0 to-purple-100/0 group-hover:from-purple-50/50 group-hover:to-purple-100/30 dark:group-hover:from-purple-900/10 dark:group-hover:to-purple-800/5 transition-all duration-500 pointer-events-none"></div>

        {/* Accent line at top */}
        <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

        <div className="relative z-10">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
            {category}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
            className="mt-4 text-xl font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-[#6B4DF8] group-hover:to-[#A787FF] group-hover:bg-clip-text transition-all duration-300"
          >
            {title}
          </motion.h3>

          {/* Details */}
          <motion.div
            className="mt-4 space-y-3 text-sm group-hover:space-y-4 transition-all duration-300"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Interest Rate:
              </span>
              <span className="font-bold text-[#6B4DF8]">{interest}</span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-300"
              whileHover={{ x: 4 }}
            >
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Max Limit:
              </span>
              <span className="font-bold text-[#6B4DF8]">{maxLimit}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <Link to={`/loan/${loan?._id}`} className="relative z-10 mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full inline-flex items-center justify-between rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-purple-300 overflow-hidden group/btn"
            onClick={onView}
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
            <span className="relative">View Details</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative"
            >
              <FiArrowRight className="text-sm" />
            </motion.span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default LoanCard;
