import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export const ThemeContext = createContext();

const THEME_KEY = "theme";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "nord";
    return localStorage.getItem(THEME_KEY) || "nord";
  });

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "nord-dark");
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "nord" ? "nord-dark" : "nord"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
