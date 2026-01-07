import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type ColorThemeOption = "light" | "dark" | "system";

type ThemeContextType = {
  colorTheme: ColorThemeOption;
  setColorTheme: (theme: ColorThemeOption) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = (): ColorThemeOption => {
    const stored = localStorage.getItem("theme") as ColorThemeOption | null;
    return stored ?? "system";
  };

  const [colorTheme, setColorTheme] =
    useState<ColorThemeOption>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (colorTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", isDark ? "dark" : "light");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", colorTheme);
      localStorage.setItem("theme", colorTheme);
    }
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
