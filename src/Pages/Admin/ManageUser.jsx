import React from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";

const users = [
  {
    id: 1,
    name: "Aminah Rahman",
    email: "aminah@example.com",
    role: "borrower",
  },
  { id: 2, name: "Kamal Uddin", email: "kamal@example.com", role: "manager" },
];

const ManageUsers = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Manage Users</h1>
          <p className="mt-1 text-xs text-slate-500">
            Update roles, suspend accounts and search through users.
          </p>
        </div>
        <input
          placeholder="Search users..."
          className="rounded-full border border-purple-100 bg-purple-50/40 px-3 py-1.5 text-xs focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-purple-100">
        <table className="min-w-full divide-y divide-purple-100 text-sm">
          <thead className="bg-[#F5F2FF] text-xs text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50 bg-white">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 text-xs text-slate-500">
                  {user.email}
                </td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2 text-right">
                  <button className="mr-2 rounded-full border border-purple-200 px-3 py-1 text-[11px] text-[#6B4DF8]">
                    Update Role
                  </button>
                  <button className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] text-red-500">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
