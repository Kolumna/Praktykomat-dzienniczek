"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children?: ReactNode;
}

const ThemeContext = createContext("");
const ThemeUpdateContext = createContext(() => {});

const queryClient = new QueryClient();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useThemeUpdate = () => {
  return useContext(ThemeUpdateContext);
};

export const QueryWrapper = ({ children }: Props) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    document.documentElement.setAttribute(
      "data-theme",
      localTheme ? localTheme : "light"
    );
    localTheme && setTheme(localTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};
