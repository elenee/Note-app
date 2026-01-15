import FontTheme, { type FontThemeOptions } from "./FontTheme";
import ColorTheme from "./ColorTheme";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import SettingsButton from "./SettingsButton ";
import { FontIcon, LockIcon, LogOutIcon, SunIcon } from "../../Icons/Icons";

const Settings = () => {
  const [, removeCookie] = useCookies(["accessToken"]);
  const { colorTheme, setColorTheme } = useTheme();
  const [fontTheme, setFontTheme] = useState<FontThemeOptions>(() => {
    const saved = localStorage.getItem("font-theme") as FontThemeOptions | null;
    return saved ?? "sans-serif";
  });

  const handleLogout = () => {
    removeCookie("accessToken", {
      path: "/",
      secure: import.meta.env.PROD,
      sameSite: "lax",
    });

    delete axios.defaults.headers.common["Authorization"];

    console.log("logout click");
  };

  const [activeSection, setActiveSection] = useState<
    "color" | "font" | "password" | null
  >("color");

  return (
    <div className="flex">
      <div className="w-72.5 max-xl:w-58 min-w-50 shrink-0 pl-8 pr-4 pt-5 flex flex-col gap-2 border-r border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)] h-screen">
        <SettingsButton
          label="Color Theme"
          icon={<SunIcon />}
          active={activeSection === "color"}
          onClick={() => setActiveSection("color")}
          showArrow
        />
        <SettingsButton
          label="Font Theme"
          icon={<FontIcon />}
          active={activeSection === "font"}
          onClick={() => setActiveSection("font")}
          showArrow
        />
        <SettingsButton
          label="Change Password"
          icon={<LockIcon />}
          active={activeSection === "password"}
          onClick={() => setActiveSection("password")}
          showArrow
        />

        <button
          className="flex items-center gap-2 p-2 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon/>
          Log out
        </button>
      </div>

      <div className="flex-1 p-6 w-full">
        {activeSection === "color" && (
          <ColorTheme selected={colorTheme} onChange={setColorTheme} />
        )}
        {activeSection === "font" && (
          <FontTheme selected={fontTheme} onChange={setFontTheme} />
        )}
        {activeSection === "password" && <ChangePassword />}
      </div>
    </div>
  );
};

export default Settings;
