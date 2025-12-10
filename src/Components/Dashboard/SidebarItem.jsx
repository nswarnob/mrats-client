import React from "react";
import { NavLink } from "react-router";

const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs transition ${
          isActive
            ? "bg-linear-to-r from-[#6B4DF8] to-[#A787FF] text-white shadow-md shadow-purple-500/40"
            : "text-purple-100 hover:bg-white/10"
        }`
      }
    >
      <span className="text-sm">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
