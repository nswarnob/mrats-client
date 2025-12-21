import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import StatCard from "../../ui/StatCard";

import useLoans from "../../hooks/useLoans";
import useUsers from "../../hooks/useUsers";

const AdminDashboard = () => {
  const { data: loans = [] } = useLoans();
  const { data: users = [] } = useUsers();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Admin Overview</h1>
      <p className="mt-1 text-xs text-slate-500">
        Quick snapshot of platform performance and applications.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <StatCard label="Total Users" value={users.length} />
        <StatCard label="Total Loans" value={loans.length} />
        <StatCard label="Pending Apps" value="27" />
        <StatCard label="Approved Today" value="11" />
      </div>
    </div>
  );
};

export default AdminDashboard;
