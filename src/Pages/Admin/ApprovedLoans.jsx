import React, { useEffect, useMemo, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";
import usePageTitle from "../../hooks/usePageTitle";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const ApprovedLoans = () => {
  usePageTitle("Approved Loans");
  const { userRole, user } = useContext(AuthContext);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const approvedApps = useMemo(
    () => apps.filter((app) => app.status === "Approved"),
    [apps],
  );

  if (loading) {
    return (
      <p className="text-sm text-slate-500">Loading approved applications...</p>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">
            Approved Loans
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Review loans that have already been approved and are being serviced.
          </p>
        </div>
      </div>

      {approvedApps.length === 0 ? (
        <div className="mt-6 rounded-3xl bg-white p-8 text-center text-sm text-slate-600 shadow-md">
          There are no approved loan applications yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {approvedApps.map((app) => (
            <div
              key={app._id}
              className="rounded-3xl bg-white p-6 shadow-md border border-purple-100"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    {app.firstName} {app.lastName}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {app.loanTitle || app.selectedLoanId || "Loan request"}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                  Approved
                </span>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-600">
                <div>Amount: ${app.loanAmount}</div>
                <div>Fee Status: {app.feeStatus}</div>
                <div>
                  Submitted: {new Date(app.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedLoans;
