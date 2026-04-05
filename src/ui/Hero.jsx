import React from "react";
import { FiPlayCircle, FiArrowRight } from "react-icons/fi";
import PrimaryButton from "../ui/PrimaryButton";
import StatCard from "../ui/StatCard";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useApplications from "../hooks/useApplication";

const Hero = () => {
  const { data: loans = [] } = useApplications();
  const loansArray = Array.isArray(loans) ? loans : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="space-y-6"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-700 dark:bg-white/10 dark:text-purple-300"
        >
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
          Microloan Management
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Get Microloans,{" "}
            <span className="gradient-text inline-block animate-pulse">
              Fast
            </span>{" "}
            and Easy.
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg"
        >
          LoanLink helps NGOs and microfinance teams manage loan requests,
          approvals, EMI schedules and repayments in one simple dashboard.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <Link to={"/dashboard/apply-loan"}>
            <PrimaryButton>
              Apply for Loan
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiPlayCircle className="text-base" />
              </motion.div>
            </PrimaryButton>
          </Link>

          <Link
            to={"/all-loans"}
            className="group inline-flex items-center gap-2 font-semibold text-[#6B4DF8] hover:text-purple-700 transition-colors"
          >
            Explore Loans
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Card with Enhanced Design */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
          delay: 0.4,
        }}
        className="relative group"
      >
        {/* Gradient overlay background */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#6B4DF8]/20 to-[#A787FF]/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Main card */}
        <div className="relative rounded-3xl bg-linear-to-br from-[#6B4DF8] to-[#A787FF] p-8 text-white shadow-2xl shadow-purple-400/30 backdrop-blur-sm border border-white/20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/10 blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-3xl -z-10"></div>
          <motion.div
            className="absolute -bottom-6 right-6 h-24 w-24 rounded-full bg-white/10 blur-3xl opacity-90"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Header */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-base font-semibold tracking-wide"
          >
            📊 Live Portfolio Snapshot
          </motion.h3>

          <div className="mt-6 rounded-3xl bg-white/10 p-4 ring-1 ring-white/15 shadow-inner shadow-white/10">
            <div className="flex items-end gap-2 h-20">
              {["70%", "90%", "55%", "80%", "65%"].map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 rounded-full bg-white/40"
                  initial={{ height: "40%" }}
                  animate={{ height: ["40%", height, "45%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: index * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.25em] text-white/75">
              Transaction trend
            </div>
          </div>

          {/* Stats Grid with stagger animation */}
          <motion.div
            className="mt-6 grid gap-4 md:grid-cols-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[
              { label: "Active Loans", value: loansArray.length },
              { label: "Total Disbursed", value: "$215K" },
              { label: "Approval Rate", value: "92%" },
              { label: "On-Time Repayments", value: "88%" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, idx % 2 === 0 ? -3 : -1.5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: 0.4 + idx * 0.15,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="rounded-2xl bg-white/10 backdrop-blur-md p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-xs font-medium uppercase tracking-wide opacity-80">
                  {stat.label}
                </div>
                <div className="mt-2 text-3xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
