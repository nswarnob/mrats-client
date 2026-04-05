import React, { useEffect, useMemo, useState } from "react";
import axiosPublic from "../../../api/axiosPublic";
import { toast } from "react-toast";
import usePageTitle from "../../hooks/usePageTitle";

const ManageUser = () => {
  usePageTitle("Manage Users");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [suspendReason, setSuspendReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axiosPublic.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users:", err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [users, searchTerm],
  );

  const updateRole = async (id, newRole) => {
    setUpdatingId(id);
    try {
      await axiosPublic.patch(`/users/${id}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: newRole } : user,
        ),
      );
      toast.success("Role updated successfully");
    } catch (err) {
      console.error("Failed to update role:", err);
      toast.error("Failed to update role");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSuspend = (id) => {
    setSelectedUserId(id);
    setSuspendReason("");
  };

  const confirmSuspend = async (id) => {
    if (!suspendReason.trim()) {
      toast.warning("Please enter a suspension reason");
      return;
    }
    setUpdatingId(id);
    try {
      await axiosPublic.patch(`/users/${id}/suspension`, {
        suspended: true,
        suspensionReason: suspendReason,
      });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, suspended: true, suspensionReason }
            : user,
        ),
      );
      setSelectedUserId(null);
      setSuspendReason("");
      toast.success("User suspended successfully");
    } catch (err) {
      console.error("Failed to suspend user:", err);
      toast.error("Failed to suspend user");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUnsuspend = async (id) => {
    setUpdatingId(id);
    try {
      await axiosPublic.patch(`/users/${id}/suspension`, {
        suspended: false,
        suspensionReason: "",
      });
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, suspended: false, suspensionReason: "" }
            : user,
        ),
      );
      toast.success("User reinstated successfully");
    } catch (err) {
      console.error("Failed to reinstate user:", err);
      toast.error("Failed to reinstate user");
    } finally {
      setUpdatingId(null);
    }
  };

  const cancelSuspend = () => {
    setSelectedUserId(null);
    setSuspendReason("");
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading users...</p>;
  }

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Manage Users</h1>
          <p className="mt-1 text-xs text-slate-500">
            Update roles, suspend accounts and search through users.
          </p>
        </div>

        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="rounded-full border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm outline-none focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200"
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-purple-100">
        <table className="min-w-full divide-y divide-purple-100 text-sm">
          <thead className="bg-[#F5F2FF] text-xs text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-50 bg-white">
            {filteredUsers.map((user) => (
              <React.Fragment key={user._id}>
                <tr>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={user.role}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                      disabled={updatingId === user._id}
                      className="rounded-full border border-purple-100 bg-purple-50/40 px-3 py-2 text-sm focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200 disabled:opacity-50"
                    >
                      <option value="borrower">Borrower</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${
                        user.suspended
                          ? "bg-red-100 text-red-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {user.suspended ? "Suspended" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!user.suspended ? (
                      <button
                        onClick={() => handleSuspend(user._id)}
                        disabled={updatingId === user._id}
                        className="rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[11px] text-red-500 hover:bg-red-100 disabled:opacity-50"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnsuspend(user._id)}
                        disabled={updatingId === user._id}
                        className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                      >
                        Reinstate
                      </button>
                    )}
                  </td>
                </tr>

                {selectedUserId === user._id && !user.suspended && (
                  <tr className="bg-slate-50">
                    <td colSpan={5} className="px-4 py-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <input
                          value={suspendReason}
                          onChange={(e) => setSuspendReason(e.target.value)}
                          placeholder="Reason for suspension"
                          className="w-full rounded-2xl border border-purple-100 bg-white px-4 py-2 text-sm outline-none focus:border-[#6B4DF8] focus:ring-2 focus:ring-purple-200 sm:max-w-xl"
                        />
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => confirmSuspend(user._id)}
                            disabled={updatingId === user._id}
                            className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                          >
                            {updatingId === user._id
                              ? "Suspending..."
                              : "Confirm"}
                          </button>
                          <button
                            onClick={cancelSuspend}
                            disabled={updatingId === user._id}
                            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                {user.suspended && (
                  <tr className="bg-red-50">
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-xs text-slate-700"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <span className="font-semibold text-red-700">
                          Suspension reason:
                        </span>
                        <span>
                          {user.suspensionReason || "No reason provided."}
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-sm text-slate-500"
                >
                  No users match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
