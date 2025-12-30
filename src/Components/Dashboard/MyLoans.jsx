import React from "react";
import { FiEye, FiXCircle, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router";
import useApplications from "../../hooks/useApplication";

const MyLoans = ({ onView, onCancel, onPay }) => {
  const loans = useApplications() || [];

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-xl font-semibold text-slate-900 mb-6">
        My Loan Applications
      </h2>

      {/* No loans */}
      {loans.length === 0 && (
        <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100 text-center text-sm text-slate-600">
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
      {loans.length > 0 && (
        <div className="overflow-x-auto rounded-2xl shadow-md border border-slate-100 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-purple-50 text-slate-700">
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
              {loans.map((loan) => (
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
                        onClick={() => onPay(loan, true)}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700"
                      >
                        Paid
                      </button>
                    ) : (
                      <button
                        onClick={() => onPay(loan)}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-600 text-white flex items-center gap-1 hover:bg-purple-700"
                      >
                        <FiDollarSign className="text-xs" /> Pay $10
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 flex gap-2">
                    {/* View */}
                    <button
                      onClick={() => onView(loan)}
                      className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 flex items-center gap-1 text-xs hover:bg-blue-100"
                    >
                      <FiEye /> View
                    </button>

                    {/* Cancel only if Pending */}
                    {loan.status === "Pending" && (
                      <button
                        onClick={() => onCancel(loan)}
                        className="px-3 py-1 rounded-full bg-red-50 text-red-700 flex items-center gap-1 text-xs hover:bg-red-100"
                      >
                        <FiXCircle /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyLoans;
