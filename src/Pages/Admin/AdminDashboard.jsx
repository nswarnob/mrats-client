import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import StatCard from "../../ui/StatCard";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Admin Overview</h1>
      <p className="mt-1 text-xs text-slate-500">
        Quick snapshot of platform performance and applications.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <StatCard label="Total Users" value="128" />
        <StatCard label="Total Loans" value="312" />
        <StatCard label="Pending Apps" value="27" />
        <StatCard label="Approved Today" value="11" />
      </div>
    </div>
  );
};

export default AdminDashboard;
