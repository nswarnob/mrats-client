import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Register from "../Pages/Register";
import ApplyLoan from "../Pages/ApplyLoan";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ManageUser from "../Pages/Admin/ManageUser";

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
      // {
      //   path:"all-loans",
      //   element: <AllLoans></AllLoans>
      // }
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
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
        path: "manage-users",
        element: <ManageUser></ManageUser>,
      },
    ],
  },
]);
