import React, { useContext, useMemo, useState } from "react";
import { FiEye, FiXCircle, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";
import usePageTitle from "../../hooks/usePageTitle";

const MyLoans = () => {
  usePageTitle("My Loans");
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [viewingLoan, setViewingLoan] = useState(null);
  const [loadingActionId, setLoadingActionId] = useState(null);

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["my-applications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/application-loans?borrowerEmail=${encodeURIComponent(user.email)}`,
      );
      return res.data;
    },
  });

  const sortedLoans = useMemo(() => {
    return [...loans].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );
  }, [loans]);

  const refetchMyLoans = () => {
    queryClient.invalidateQueries({ queryKey: ["my-applications", user?.email] });
  };

  const handleCancel = async (loan) => {
    if (loan.status !== "Pending") {
      toast.warning("Only pending applications can be cancelled.");
      return;
    }

    const confirmed = window.confirm(
      "Do you want to cancel this pending application?",
    );
    if (!confirmed) return;

    setLoadingActionId(loan._id);
    try {
      await axiosPublic.patch(`/application-loans/${loan._id}/status`, {
        status: "Cancelled",
      });
      toast.success("Application cancelled.");
      refetchMyLoans();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel loan.");
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleDemoPayment = async (loan) => {
    if (loan.feeStatus === "Paid") {
      toast.info("Application fee is already paid.");
      return;
    }

    const confirmed = window.confirm(
      "Demo Stripe payment: charge $10 application fee?",
    );
    if (!confirmed) return;

    setLoadingActionId(loan._id);
    try {
      try {
        await axiosPublic.patch(`/application-loans/${loan._id}/payment`, {
          feeStatus: "Paid",
          paymentMethod: "stripe_demo",
          paidAmount: 10,
        });
      } catch {
        await axiosPublic.patch(`/application-loans/${loan._id}`, {
          feeStatus: "Paid",
          paymentMethod: "stripe_demo",
          paidAmount: 10,
        });
      }

      toast.success("Demo payment completed.");
      refetchMyLoans();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Payment failed.");
    } finally {
      setLoadingActionId(null);
    }
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        My Loan Applications
      </h2>

      {isLoading && (
        <div className="mb-4 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
          Loading your applications...
        </div>
      )}

      {/* No loans */}
      {!isLoading && sortedLoans.length === 0 && (
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-slate-950/40 border border-slate-100 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-300">
          You haven't applied for any loans yet.{" "}
          <Link
            className="text-xs font-semibold text-[#6B4DF8]"
            to="/dashboard/apply-loan"
          >
            {" "}
            Apply Now
          </Link>
        </div>
      )}

      {/* Table */}
      {sortedLoans.length > 0 && (
        <div className="overflow-x-auto rounded-2xl shadow-md border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-purple-50 dark:bg-purple-900/20 text-slate-700 dark:text-slate-200">
              <tr>
                <th className="py-3 px-4 text-left">Loan ID</th>
                <th className="py-3 px-4 text-left">Loan Info</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Fee Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sortedLoans.map((loan) => (
                <tr key={loan._id} className="border-t last:border-b">
                  <td className="py-3 px-4 text-slate-700 font-medium">
                    {loan._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-900">
                      {loan.loanTitle}
                    </p>
                    <p className="text-xs text-slate-500">
                      {loan.category} • {loan.interestRate}%
                    </p>
                  </td>

                  <td className="py-3 px-4 font-semibold text-slate-800">
                    ${loan.loanAmount}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold 
                      ${
                        loan.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : loan.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>

                  {/* Fee Status */}
                  <td className="py-3 px-4">
                    {loan.feeStatus === "Paid" ? (
                      <button
                        onClick={() => handleDemoPayment(loan)}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                      >
                        Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDemoPayment(loan)}
                        disabled={loadingActionId === loan._id}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white flex items-center gap-1 hover:bg-purple-700"
                      >
                        <FiDollarSign className="text-xs" />{" "}
                        {loadingActionId === loan._id ? "Processing..." : "Pay $10"}
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 flex gap-2">
                    {/* View */}
                    <button
                      onClick={() => setViewingLoan(loan)}
                      className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1 text-xs hover:bg-blue-100"
                    >
                      <FiEye /> View
                    </button>

                    {/* Cancel only if Pending */}
                    {loan.status === "Pending" && (
                      <button
                        onClick={() => handleCancel(loan)}
                        disabled={loadingActionId === loan._id}
                        className="px-3 py-1 rounded-full bg-red-50 text-red-700 flex items-center gap-1 text-xs hover:bg-red-100"
                      >
                        <FiXCircle />{" "}
                        {loadingActionId === loan._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewingLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Application Details
            </h3>
            <div className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300">
              <p>
                <span className="font-semibold">Loan:</span> {viewingLoan.loanTitle}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> $
                {viewingLoan.loanAmount}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {viewingLoan.status}
              </p>
              <p>
                <span className="font-semibold">Fee:</span> {viewingLoan.feeStatus}
              </p>
              <p>
                <span className="font-semibold">Submitted:</span>{" "}
                {new Date(viewingLoan.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setViewingLoan(null)}
                className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLoans;
