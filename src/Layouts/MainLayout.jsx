import React, { useState } from "react";
import Navbar from "../Components/Shared/Navbar";
import Footer from "../Components/Shared/Footer";
import { Outlet } from "react-router";


const MainLayout = () => {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "bg-[#0F0A1A] text-purple-50" : "bg-[#F5F2FF]"}>
      <Navbar
        darkMode={dark}
        onToggleTheme={() => setDark((p) => !p)}
        // replace with real auth condition
        isAuthed={false}
      />
      <main className="mx-auto min-h-[calc(100vh-140px)] max-w-6xl px-4 py-10">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
