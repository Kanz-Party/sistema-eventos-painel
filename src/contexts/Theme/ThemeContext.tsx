// Your Theme Context file
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import lightTheme from "../../Themes/lightTheme";
import darkTheme from "../../Themes/darkTheme";
import { ThemeType, ThemeContextType } from "../../types/Theme";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const savedTheme = localStorage.getItem("theme");
  const userPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const defaultTheme = savedTheme
    ? savedTheme === "dark"
      ? darkTheme
      : lightTheme
    : userPrefersDark
    ? darkTheme
    : lightTheme;

  const [theme, setTheme] = useState<any>(defaultTheme);

  useEffect(() => {
    const currentTheme = theme === darkTheme ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
  }, [theme]);

  const toggleDarkTheme = () => {
    const currentThemeFromLocalStorage = localStorage.getItem("theme");

    if (currentThemeFromLocalStorage === "dark") {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
    } else {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
