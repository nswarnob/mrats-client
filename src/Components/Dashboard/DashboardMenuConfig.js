import {
  FiHome,
  FiUsers,
  FiCreditCard,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiUser,
} from "react-icons/fi";

export const dashboardMenu = {
  admin: [
    { label: "Overview", icon: FiHome, to: "/dashboard" },
    { label: "Manage Users", icon: FiUsers, to: "/dashboard/manage-users" },
    { label: "All Loans", icon: FiCreditCard, to: "/dashboard/all-loan" },
    {
      label: "Loan Applications",
      icon: FiCreditCard,
      to: "/dashboard/loan-applications",
    },
  ],

  manager: [
    { label: "Overview", icon: FiHome, to: "/dashboard" },
    { label: "Add Loan", icon: FiPlus, to: "/dashboard/add-loan" },
    {
      label: "Manage Loans",
      icon: FiCreditCard,
      to: "/dashboard/manage-loans",
    },
    {
      label: "Pending Applications",
      icon: FiClock,
      to: "/dashboard/pending-loans",
    },
    {
      label: "Approved Applications",
      icon: FiCheckCircle,
      to: "/dashboard/approved-loans",
    },
  ],

  borrower: [
    { label: "Overview", icon: FiHome, to: "/dashboard" },
    { label: "My Loans", icon: FiCreditCard, to: "/dashboard/my-loans" },
    { label: "Apply for Loan", icon: FiPlus, to: "/dashboard/apply-loan" },
  ],

  common: [
    { label: "Profile", icon: FiUser, to: "/dashboard/profile" },
    { label: "Back To Home", icon: FiHome, to: "/" },
  ],
};
