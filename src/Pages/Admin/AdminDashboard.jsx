import React from "react";
import { useContext, useMemo } from "react";
import StatCard from "../../ui/StatCard";
import useLoans from "../../hooks/useLoans";
import useUsers from "../../hooks/useUsers";
import useApplications from "../../hooks/useApplication";
import { AuthContext } from "../../Provider/AuthProvider";
import usePageTitle from "../../hooks/usePageTitle";

const AdminDashboard = () => {
  const { userRole } = useContext(AuthContext);
  const { data: loans = [] } = useLoans();
  const { data: users = [] } = useUsers();
  const { data: applications = [] } = useApplications();

  const dashboardTitle = useMemo(() => {
    if (userRole === "manager") return "Manager Overview";
    if (userRole === "borrower") return "Borrower Overview";
    return "Admin Overview";
  }, [userRole]);

  usePageTitle(dashboardTitle);

  const pendingApplications = applications.filter(
    (item) => item.status === "Pending",
  ).length;
  const approvedApplications = applications.filter(
    (item) => item.status === "Approved",
  ).length;

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">{dashboardTitle}</h1>
      <p className="mt-1 text-xs text-slate-500">
        Quick snapshot of platform performance and applications.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {(userRole === "admin" || userRole === "manager") && (
          <StatCard label="Total Users" value={users.length} />
        )}
        <StatCard label="Total Loans" value={loans.length} />
        <StatCard label="Pending Apps" value={pendingApplications} />
        <StatCard label="Approved Apps" value={approvedApplications} />
      </div>
    </div>
  );
};

export default AdminDashboard;
