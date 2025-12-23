import React from "react";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F5F2FF] text-slate-900 dark:bg-[#0F0A1A] dark:text-slate-100">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-140px)] max-w-6xl px-4 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
