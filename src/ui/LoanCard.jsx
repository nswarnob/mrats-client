import React from "react";
import { FiArrowRight } from "react-icons/fi";
import PrimaryButton from "./PrimaryButton";
import { Link } from "react-router";

const LoanCard = ({ title, category, interest, maxLimit, onView }) => {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-xl shadow-purple-200/60 border border-purple-100">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-purple-400">
          {category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">{title}</h3>
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-purple-600">Interest:</span>{" "}
            {interest}
          </p>
          <p>
            <span className="font-semibold text-purple-600">Max Limit:</span>{" "}
            {maxLimit}
          </p>
        </div>
      </div>

      <Link to={`/`}>
        <PrimaryButton
          className="mt-4 w-full justify-between px-4 py-2 text-xs"
          onClick={onView}
        >
          View Details
          <FiArrowRight className="text-sm" />
        </PrimaryButton>
      </Link>
    </div>
  );
};

export default LoanCard;
