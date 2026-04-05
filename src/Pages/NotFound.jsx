import React from "react";
import { Link } from "react-router";
import usePageTitle from "../hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("404 Not Found");

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl shadow-purple-200/60 dark:bg-slate-900 dark:shadow-slate-950/40">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-linear-to-r from-[#6B4DF8] to-[#A787FF] px-5 py-2 text-sm font-semibold text-white"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
