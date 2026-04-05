import React from "react";
import { motion } from "framer-motion";

const PrimaryButton = ({ children, className = "", ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full 
      bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-5 py-2.5 text-sm font-semibold 
      text-white shadow-lg shadow-purple-500/30 transition-all duration-300 
      hover:shadow-xl hover:shadow-purple-500/50 
      focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2
      relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Animated background shine */}
      <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent 
        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default PrimaryButton;
