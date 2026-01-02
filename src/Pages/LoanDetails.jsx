import React, { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import PrimaryButton from "../ui/PrimaryButton";
import { toast } from "react-toast";
import Loader from "../ui/Loader";
import useLoan from "../hooks/useLoan";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);

  const { data: loan, isLoading, isError, error } = useLoan(id);

  // toast only once when error happens
  useMemo(() => {
    if (isError) {
      toast.error(
        error?.response?.data?.message || "Failed to load loan details"
      );
    }
  }, [isError, error]);

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!loan) {
    return (
      <div className="flex justify-center py-20 text-sm text-red-500">
        Loan not found
      </div>
    );
  }

  const title = loan.title;
  const description = loan.description;
  const category = loan.category;
  const interest = loan.interestRate ?? loan.interest;
  const maxLimit = loan.maxLimit;
  const emiPlans = loan.emiPlans || [];
  const image = loan.image;

  const canApply = !!user && role === "borrower";

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl bg-linear-to-tr from-purple-100 to-purple-200">
            <img src={image} alt={title} className="h-72 w-full object-cover" />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

              <span className="shrink-0 rounded-full bg-purple-100 px-3 py-1 text-[11px] font-semibold text-purple-700">
                {category}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {description}
            </p>

            <div className="mt-6 grid gap-3 rounded-2xl bg-purple-50/50 p-4 ring-1 ring-purple-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Interest Rate</span>
                <span className="font-semibold text-slate-900">
                  {interest}%
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Maximum Limit</span>
                <span className="font-semibold text-slate-900">
                  ${maxLimit?.toLocaleString?.() || maxLimit}
                </span>
              </div>
            </div>

            {/* EMI Plans */}
            {emiPlans.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold text-slate-800">
                  Available EMI Plans
                </h3>

                <div className="flex flex-wrap gap-2">
                  {emiPlans.map((emi, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-100"
                    >
                      {emi} months
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Apply Button */}
            <div className="mt-8">
              {canApply ? (
                <PrimaryButton
                  onClick={() => navigate(`/apply-loan/${loan._id}`)}
                >
                  Apply Now
                </PrimaryButton>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 ring-1 ring-slate-100">
                  Only <span className="font-semibold">Borrowers</span> can
                  apply for loans.
                </div>
              )}
            </div>

            {/* Back button */}
            <button
              onClick={() => navigate(-1)}
              className="mt-4 text-xs font-semibold text-[#6B4DF8] hover:underline"
            >
              ← Back to Loans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
