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

type FontThemeProps = {
  selected: FontThemeOptions;
  onChange: (value: FontThemeOptions) => void;
};

const FontTheme = ({ selected, onChange }: FontThemeProps) => {
  const applyFontTheme = (font: FontThemeOptions) => {
    const root = document.documentElement;

    const map: Record<FontThemeOptions, string> = {
      "sans-serif": "var(--font-sans)",
      serif: "var(--font-serif)",
      monospace: "var(--font-mono)",
    };

    root.style.setProperty("--app-font", map[font]);
    localStorage.setItem("font-theme", font);

    onChange(font);
  };

  return (
    <ThemeOption<FontThemeOptions>
      title="Font Theme"
      options={themeOptions}
      selected={selected}
      onChange={applyFontTheme}
    />
  );
};

export default FontTheme;
