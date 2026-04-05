import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ label, value, helper }) => {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md p-5 text-sm text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/30 border border-white/20 hover:border-white/40 transition-all duration-300"
    >
      {/* Animated gradient on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-white/0 to-purple-500/0 group-hover:from-white/5 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none"></div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          className="text-xs uppercase tracking-wide font-semibold text-white/80 group-hover:text-white transition-colors"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {label}
        </motion.div>

        <motion.div
          className="mt-3 text-3xl font-bold text-white drop-shadow-lg"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {value}
        </motion.div>

        {helper && (
          <motion.p
            className="mt-2 text-xs text-white/70 group-hover:text-white/90 transition-colors"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            {helper}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
