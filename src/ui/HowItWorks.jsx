import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiActivity, FiTrendingUp } from "react-icons/fi";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: FiCheckCircle,
      title: "Submit Request",
      description:
        "Fill out a simple loan application form with your details and loan amount requirement.",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: 2,
      icon: FiActivity,
      title: "Review & Verify",
      description:
        "Our team reviews your application and verifies your information to ensure accuracy.",
      color: "from-purple-500 to-purple-600",
    },
    {
      number: 3,
      icon: FiTrendingUp,
      title: "Approve & Track",
      description:
        "Get instant approval notifications and track your loan status in real-time through our dashboard.",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
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

  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/80 dark:bg-purple-900/30 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Our Process
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white"
        >
          How <span className="gradient-text inline-block">LoanLink</span> Works
        </motion.h2>
      </motion.div>

      {/* Steps Grid */}
      <motion.div
        className="grid gap-8 md:grid-cols-3 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        {/* Connection lines (desktop only) */}
        <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-linear-to-r from-transparent via-purple-300/30 dark:via-purple-600/30 to-transparent pointer-events-none"></div>

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div key={idx} variants={itemVariants} className="group">
              <div className="relative">
                {/* Step card */}
                <div className="relative rounded-2xl bg-slate-50 dark:bg-slate-900 p-8 text-center border border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-600/50 transition-all duration-300 shadow-lg dark:shadow-slate-950/40 hover:shadow-xl">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-50/0 to-purple-100/0 group-hover:from-purple-50/30 group-hover:to-purple-100/20 dark:group-hover:from-purple-900/10 dark:group-hover:to-purple-800/5 transition-all duration-500 pointer-events-none"></div>

                  {/* Step number badge */}
                  <motion.div
                    className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] text-2xl font-bold text-white shadow-lg shadow-purple-500/30 mx-auto group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.2,
                    }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`mt-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-r ${step.color} text-white`}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                  >
                    <Icon className="text-xl" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="relative z-10 mt-6 text-xl font-bold text-slate-900 dark:text-white"
                    whileHover={{ scale: 1.05 }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="relative z-10 mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Accent line at bottom */}
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-purple-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl"></div>
                </div>

                {/* Floating particles */}
                {[0, 1, 2].map((particle) => (
                  <motion.div
                    key={particle}
                    className="absolute h-1 w-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100"
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * -100 - 50],
                      opacity: [1, 0],
                    }}
                    transition={{ duration: 1, delay: particle * 0.1 }}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
          Getting a loan has never been this easy. Start your journey today! 🚀
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorks;
