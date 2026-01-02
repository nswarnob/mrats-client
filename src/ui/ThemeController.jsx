import React, { useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";

const ThemeControler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="swap swap-rotate cursor-pointer">
      {/* hidden checkbox */}
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "nord-dark"}
      />

      {/* ☀️ sun icon (light mode) */}
      <svg
        className="swap-off h-8 w-8 fill-current rounded-full bg-base-100 shadow text-yellow-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,1,0,1.41,1.41l.71-.71A1,1,0,0,0,5.64,17ZM12,5.5A6.5,6.5,0,1,0,18.5,12,6.51,6.51,0,0,0,12,5.5Z" />
      </svg>

      {/* 🌙 moon icon (dark mode) */}
      <svg
        className="swap-on h-8 w-8 fill-current bg-base-100  rounded-full shadow text-blue-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8,8,0,1,1-7.49-13A10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
      </svg>
    </label>
  );
};

export default ThemeControler;
