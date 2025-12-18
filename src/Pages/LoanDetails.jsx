import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import axiosPublic from "../../api/axiosPublic";
import PrimaryButton from "../ui/PrimaryButton";
import { toast } from "react-toast";

const LoanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useContext(AuthContext);

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axiosPublic.get(`/loans/${id}`);
        setLoan(res.data);
      } catch (error) {
        toast.error("Failed to load loan details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-sm text-slate-500">
        Loading loan details...
      </div>
    );
  }

  if (!loan) {
    return (
      <div className="flex justify-center py-20 text-sm text-red-500">
        Loan not found
      </div>
    );
  }

  const { title, description, category, interest, maxLimit, emiPlans, image } =
    loan;

  const canApply = user && role === "borrower";

  return (
    <div className="px-4 py-12">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl shadow-purple-200/70">
        {/* Header */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <img
            src={image}
            alt={title}
            className="h-72 w-full rounded-2xl object-cover"
          />

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{description}</p>

            <div className="mt-6 grid gap-4 text-sm text-slate-700">
              <p>
                <span className="font-semibold">Category:</span> {category}
              </p>
              <p>
                <span className="font-semibold">Interest Rate:</span> {interest}
                %
              </p>
              <p>
                <span className="font-semibold">Maximum Limit:</span> $
                {maxLimit}
              </p>
            </div>

            {/* EMI Plans */}
            {emiPlans?.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-semibold text-slate-800">
                  Available EMI Plans
                </h3>
                <div className="flex flex-wrap gap-2">
                  {emiPlans.map((emi, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700"
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
                <p className="text-xs text-slate-500">
                  Only borrowers can apply for loans.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
