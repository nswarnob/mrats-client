import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="space-y-15">
      {" "}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-semi-bold text-center text-slate-900"
      >
        How <span className="text-[#6B4DF8]">LoanLink</span> Works
      </motion.h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {["Request", "Review & Verify", "Approve & Track"].map((step, idx) => (
          <div key={step} className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-[#6B4DF8]">
              {idx + 1}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-slate-900">
              {step}
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
