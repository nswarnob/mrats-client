import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index:true,
        element: <HomePage></HomePage>,
      },
      {
        path:"login",
        element: <Login></Login>
      },
      // {
      //   path:"all-loans",
      //   element: <AllLoans></AllLoans>
      // }
    ],
  },
]);
