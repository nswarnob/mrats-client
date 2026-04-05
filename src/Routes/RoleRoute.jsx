import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";
import Loader from "../ui/Loader";

const RoleRoute = ({ allowedRoles = [], children }) => {
  const { user, userRole, loading, userSuspended } = useContext(AuthContext);
  const currentRole = userRole || user?.role || "borrower";

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userSuspended) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="rounded-3xl bg-white p-8 shadow-lg text-center max-w-md">
          <h1 className="text-2xl font-semibold text-red-600">
            Account Suspended
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Your account has been suspended. Please contact support for more
            information.
          </p>
        </div>
      </div>
    );
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
