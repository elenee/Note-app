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

type ColorThemeProps = {
  selected: ColorThemeOption;
  onChange: (value: ColorThemeOption) => void;
};

const ColorTheme = ({ selected, onChange }: ColorThemeProps) => {
  return (
    <ThemeOption<ColorThemeOption>
      title="Color Theme"
      options={colorOptions}
      selected={selected}
      onChange={onChange}
    />
  );
};

export default ColorTheme;
