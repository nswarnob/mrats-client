import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Register from "../Pages/Register";
import ApplyLoan from "../Components/Dashboard/ApplyLoan";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ManageUser from "../Pages/Admin/ManageUser";
import ManageLoans from "../Pages/Admin/ManageLoans";
import PendingLoans from "../Pages/Admin/PendingLoans";
import ApprovedLoans from "../Pages/Admin/ApprovedLoans";
import LoanApplications from "../Pages/Admin/LoanApplications";
import AllLoans from "../Pages/AllLoans";
import ContactPage from "../Pages/ContactPage";
import AboutPage from "../Pages/AboutPage";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import DashboardProfile from "../Components/Dashboard/DashboardProfile";
import MyLoans from "../Components/Dashboard/MyLoans";
import LoanDetails from "../Pages/LoanDetails";
import AddLoan from "../Pages/Admin/AddLoan";
import NotFound from "../Pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "all-loans",
        element: <AllLoans></AllLoans>,
      },
      {
        path: "contact",
        element: <ContactPage></ContactPage>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "loan/:id",
        element: (
          <PrivateRoute>
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "apply-loan",
        element: <ApplyLoan></ApplyLoan>,
      },
      {
        path: "apply-loan/:id",
        element: <ApplyLoan></ApplyLoan>,
      },
      {
        path: "manage-users",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <ManageUser />
          </RoleRoute>
        ),
      },
      {
        path: "all-loan",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <AllLoans />
          </RoleRoute>
        ),
      },
      {
        path: "manage-loans",
        element: (
          <RoleRoute allowedRoles={["manager", "admin"]}>
            <ManageLoans />
          </RoleRoute>
        ),
      },
      {
        path: "pending-loans",
        element: (
          <RoleRoute allowedRoles={["manager", "admin"]}>
            <PendingLoans />
          </RoleRoute>
        ),
      },
      {
        path: "approved-loans",
        element: (
          <RoleRoute allowedRoles={["manager", "admin"]}>
            <ApprovedLoans />
          </RoleRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <RoleRoute allowedRoles={["admin"]}>
            <LoanApplications />
          </RoleRoute>
        ),
      },
      {
        path: "profile",
        element: <DashboardProfile></DashboardProfile>,
      },
      {
        path: "my-loans",
        element: <MyLoans></MyLoans>,
      },
      {
        path: "add-loan",
        element: (
          <RoleRoute allowedRoles={["manager", "admin"]}>
            <AddLoan />
          </RoleRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
