import React, { useEffect, useMemo, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";
import usePageTitle from "../../hooks/usePageTitle";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const PendingLoans = () => {
  usePageTitle("Pending Applications");
  const { userRole, user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const query =
          userRole === "manager" && user?.email
            ? `?managerEmail=${encodeURIComponent(user.email)}`
            : "";
        const res = await axiosPublic.get(`/application-loans${query}`);
        setApps(res.data);
      } catch (err) {
        console.error("Failed to load applications:", err);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [userRole, user?.email]);

  const pendingApps = useMemo(
    () => apps.filter((app) => app.status === "Pending"),
    [apps],
  );

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await axiosPublic.patch(`/application-loans/${id}/status`, { status });
      setApps((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status } : item)),
      );
      toast.success(`Application ${status.toLowerCase()} successfully`);
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update application status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading applications...</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Pending Applications
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Review new loan requests and approve or reject them.
          </p>
        </div>
      </div>

      {pendingApps.length === 0 ? (
        <div className="mt-6 rounded-3xl bg-white p-8 text-center text-sm text-slate-600 shadow-md">
          There are no pending loan applications right now.
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-3xl border border-purple-100 shadow-sm">
          <table className="min-w-full divide-y divide-purple-100 text-sm bg-white">
            <thead className="bg-[#F5F2FF] text-xs text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Applicant</th>
                <th className="px-4 py-3 text-left">Loan</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Submitted</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {pendingApps.map((app) => (
                <tr key={app._id}>
                  <td className="px-4 py-4 text-slate-700">
                    {app.firstName} {app.lastName}
                  </td>
                  <td className="px-4 py-4 text-slate-700 text-xs">
                    {app.loanTitle || app.selectedLoanId || "Loan request"}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    ${app.loanAmount}
                  </td>
                  <td className="px-4 py-4 text-slate-500 text-xs">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-right space-x-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                      disabled={updatingId === app._id}
                      onClick={() => updateStatus(app._id, "Approved")}
                    >
                      <FiCheck /> {updatingId === app._id ? "..." : "Approve"}
                    </button>
                    <button
                      className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-200 disabled:opacity-50"
                      disabled={updatingId === app._id}
                      onClick={() => updateStatus(app._id, "Rejected")}
                    >
                      <FiX /> {updatingId === app._id ? "..." : "Reject"}
                    </button>
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

export default PendingLoans;
