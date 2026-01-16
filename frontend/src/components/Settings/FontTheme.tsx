import { useState } from "react";
import { MonospaceIcon, SansSerifIcon, SerifIcon } from "../../Icons/Icons";
import type { ThemeOptionItem } from "./ThemeOption";
import ThemeOption from "./ThemeOption";

export type FontThemeOptions = "sans-serif" | "serif" | "monospace";

const themeOptions: ThemeOptionItem<FontThemeOptions>[] = [
  {
    label: "Sans-serif",
    value: "sans-serif",
    text: "Pick a clean and classic light theme",
    icon: <SansSerifIcon />,
  },
  {
    label: "Serif",
    value: "serif",
    text: "Select a sleek and modern dark theme",
    icon: <SerifIcon />,
  },
  {
    label: "Monospace",
    value: "monospace",
    text: "Adapts to your device’s theme",
    icon: <MonospaceIcon />,
  },
];

const FontTheme = () => {
  const [fontTheme, setFontTheme] = useState<FontThemeOptions>(() => {
    const saved = localStorage.getItem("font-theme") as FontThemeOptions | null;
    return saved ?? "sans-serif";
  });

  const applyFontTheme = (font: FontThemeOptions) => {
    const root = document.documentElement;

    const map: Record<FontThemeOptions, string> = {
      "sans-serif": "var(--font-sans)",
      serif: "var(--font-serif)",
      monospace: "var(--font-mono)",
    };

    root.style.setProperty("--app-font", map[font]);
    localStorage.setItem("font-theme", font);

    setFontTheme(font)
  };

  return (
    <ThemeOption<FontThemeOptions>
      title="Font Theme"
      options={themeOptions}
      selected={fontTheme}
      onChange={applyFontTheme}
    />
  );
};

export default FontTheme;
