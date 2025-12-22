import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import Register from "../Pages/Register";
import ApplyLoan from "../Components/Dashboard/ApplyLoan";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ManageUser from "../Pages/Admin/ManageUser";
import AllLoans from "../Pages/AllLoans";
import Contact from "../ui/Contact";
import AboutUs from "../ui/AboutUs";
import PrivateRoute from "./PrivateRoute";
import DashboardProfile from "../Components/Dashboard/DashboardProfile";
import MyLoans from "../Components/Dashboard/MyLoans";
import LoanDetails from "../Pages/LoanDetails";

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
        element: <Contact></Contact>,
      },
      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "loan/:id",
        element: (
          <PrivateRoute>
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
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
        path: "manage-users",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "profile",
        element: <DashboardProfile></DashboardProfile>,
      },
      {
        path: "my-loans",
        element: <MyLoans></MyLoans>,
      },
    ],
  },
]);
