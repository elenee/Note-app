import { useTheme } from "../../context/ThemeContext";
import { MoonIcon, SunIcon, SystemIcon } from "../../Icons/Icons";
import type { ThemeOptionItem } from "./ThemeOption";
import ThemeOption from "./ThemeOption";

export type ColorThemeOption = "light" | "dark" | "system";

const colorOptions: ThemeOptionItem<ColorThemeOption>[] = [
  {
    label: "Light Mode",
    value: "light",
    text: "Pick a clean and classic light theme",
    icon: <SunIcon />,
  },
  {
    label: "Dark Mode",
    value: "dark",
    text: "Select a sleek and modern dark theme",
    icon: <MoonIcon />,
  },
  {
    label: "System",
    value: "system",
    text: "Adapts to your device’s theme",
    icon: <SystemIcon />,
  },
];

const ColorTheme = () => {
  const { colorTheme, setColorTheme } = useTheme();
  return (
    <ThemeOption<ColorThemeOption>
      title="Color Theme"
      options={colorOptions}
      selected={colorTheme}
      onChange={setColorTheme}
    />
  );
};

export default ColorTheme;
