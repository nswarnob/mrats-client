import React from "react";

const StatCard = ({ label, value, helper }) => {
  return (
    <div className="rounded-2xl bg-white/5 p-4 text-sm text-purple-50 shadow-lg shadow-purple-900/30 border border-white/10">
      <div className="text-xs uppercase tracking-wide text-purple-200">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {helper && <p className="mt-1 text-xs text-purple-200">{helper}</p>}
    </div>
  );
};

export default StatCard;
