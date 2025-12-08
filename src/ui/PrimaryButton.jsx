import React from "react";

const PrimaryButton = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full 
      bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-5 py-2.5 text-sm font-semibold 
      text-white shadow-lg shadow-purple-500/30 transition hover:brightness-110 
      focus:outline-none focus:ring-2 focus:ring-purple-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
