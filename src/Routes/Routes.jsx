import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Register from "../Pages/Register";
import ApplyLoan from "../Pages/ApplyLoan";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ManageUser from "../Pages/Admin/ManageUser";
import AllLoans from "../Pages/AllLoans";
import Contact from "../ui/Contact";
import AboutUs from "../ui/AboutUs";
import PrivateRoute from "./PrivateRoute";
import DashboardProfile from "../Components/Dashboard/DashboardProfile";

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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-loans",
        element: <AllLoans></AllLoans>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
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
        path: "/dashboard/apply-loan",
        element: <ApplyLoan></ApplyLoan>,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "/dashboard/profile",
        element: <DashboardProfile></DashboardProfile>,
      },
    ],
  },
]);
