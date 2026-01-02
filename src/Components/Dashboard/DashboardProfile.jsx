import React, { useContext } from "react";
import { FiMail, FiUser, FiShield, FiCalendar, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../Provider/AuthProvider";

const DashboardProfile = () => {
  const { user, userRole, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Fallbacks
  const name = user?.displayName || "Unknown User";
  const email = user?.email || "No email found";
  const photo = user?.photoURL;
  const role = userRole || user?.role || "borrower"; 

  const createdAt = user?.metadata?.creationTime || "Not available";

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Top card */}
      <div className="rounded-2xl bg-linear-to-r from-[#6B4DF8] to-[#A787FF] p-4 text-white shadow-lg shadow-purple-300/60 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-xs text-purple-100 flex items-center gap-1">
            <FiMail className="text-[13px]" /> {email}
          </p>
          <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-[11px]">
            <FiShield className="text-[13px]" />
            <span className="capitalize">{role}</span>
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#6B4DF8] hover:bg-white"
        >
          <FiLogOut className="text-xs" />
          Logout
        </button>
      </div>

      {/* Details card */}
      <div className="rounded-2xl bg-white p-6 shadow-md shadow-slate-100 border border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">
          Profile Details
        </h2>

        <div className="space-y-3 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-[#6B4DF8]">
              <FiUser />
            </span>
            <div>
              <p className="font-medium text-slate-900">Full Name</p>
              <p>{name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-[#6B4DF8]">
              <FiMail />
            </span>
            <div>
              <p className="font-medium text-slate-900">Email Address</p>
              <p>{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-[#6B4DF8]">
              <FiShield />
            </span>
            <div>
              <p className="font-medium text-slate-900">Account Role</p>
              <p className="capitalize">{role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-[#6B4DF8]">
              <FiCalendar />
            </span>
            <div>
              <p className="font-medium text-slate-900">Member Since</p>
              <p>{createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: small note */}
      <p className="text-[11px] text-slate-400 text-center">
        Your profile information is synced from your LoanLink account and
        Firebase authentication.
      </p>
    </div>
  );
};

export default DashboardProfile;
