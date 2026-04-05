import React, { useEffect, useMemo, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";

const LoanApplications = () => {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await axiosPublic.get("/application-loans");
        setApps(res.data);
      } catch (err) {
        console.error("Failed to load applications:", err);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesStatus =
        statusFilter === "all" ? true : app.status === statusFilter;
      const matchesSearch =
        !searchTerm ||
        `${app.firstName} ${app.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        app.loanTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [apps, searchTerm, statusFilter]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await axiosPublic.patch(`/application-loans/${id}/status`, { status });
      setApps((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status } : app)),
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
    return (
      <p className="text-sm text-slate-500">Loading loan applications...</p>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Loan Applications
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Filter and review all loan applications across your platform.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, loan, or email"
            className="rounded-full border border-purple-100 bg-purple-50/40 px-4 py-2 text-sm outline-none focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-purple-100 bg-white px-4 py-2 text-sm outline-none focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-purple-100 shadow-sm">
        <table className="min-w-full divide-y divide-purple-100 text-sm bg-white">
          <thead className="bg-[#F5F2FF] text-xs text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Applicant</th>
              <th className="px-4 py-3 text-left">Loan</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Submitted</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50">
            {filteredApps.map((app) => (
              <tr key={app._id}>
                <td className="px-4 py-4 text-slate-700">
                  <div className="font-semibold">
                    {app.firstName} {app.lastName}
                  </div>
                  <div className="text-xs text-slate-500">{app.email}</div>
                </td>
                <td className="px-4 py-4 text-slate-700 text-xs">
                  {app.loanTitle || app.selectedLoanId || "Loan request"}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                      app.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : app.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-amber-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-500 text-xs">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-right space-x-2">
                  {app.status === "Pending" ? (
                    <>
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
                    </>
                  ) : (
                    <span className="text-xs text-slate-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanApplications;
