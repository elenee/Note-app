import FontTheme, { type FontThemeOptions } from "./FontTheme";
import ColorTheme from "./ColorTheme";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import SettingsButton from "./SettingsButton ";

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
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.045 2.5V3.64325M10.045 16.3567V17.5M17.5449 10.0001H16.4017M3.68817 10.0001H2.54492M15.3481 4.69652L14.5398 5.50491M5.55022 14.4948L4.74184 15.3032M15.3481 15.3032L14.5398 14.4948M5.55022 5.5053L4.74184 4.69692"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0451 6.50391C11.9764 6.50391 13.5413 8.06959 13.5413 10.0002C13.5413 11.9315 11.9764 13.4972 10.0451 13.4972C8.1137 13.4972 6.54883 11.9315 6.54883 10.0002C6.54883 8.06959 8.1137 6.50391 10.0451 6.50391Z"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </svg>
          }
          active={activeSection === "color"}
          onClick={() => setActiveSection("color")}
          showArrow
        />
        <SettingsButton
          label="Font Theme"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.4994 9.1488H12.1927C11.7327 9.1488 11.3594 9.5213 11.3594 9.98214V10.9238C11.3594 11.3846 11.7327 11.7571 12.1927 11.7571C12.6527 11.7571 13.026 11.3846 13.026 10.9238V10.8155H13.9877V14.4896H13.6627C13.2027 14.4896 12.8294 14.8621 12.8294 15.323C12.8294 15.7838 13.2027 16.1563 13.6627 16.1563H16.0302C16.4902 16.1563 16.8635 15.7838 16.8635 15.323C16.8635 14.8621 16.4902 14.4896 16.0302 14.4896H15.6544V10.8155H16.666V10.9238C16.666 11.3846 17.0394 11.7571 17.4994 11.7571C17.9594 11.7571 18.3327 11.3846 18.3327 10.9238V9.98214C18.3327 9.5213 17.9594 9.1488 17.4994 9.1488Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.1543 14.4904H8.57518V5.50785H12.2543V6.54952C12.2543 7.00952 12.6277 7.38285 13.0877 7.38285C13.5477 7.38285 13.921 7.00952 13.921 6.54952V4.67452C13.921 4.21369 13.5477 3.84119 13.0877 3.84119H2.49935C2.03935 3.84119 1.66602 4.21369 1.66602 4.67452V6.54952C1.66602 7.00952 2.03935 7.38285 2.49935 7.38285C2.95935 7.38285 3.33268 7.00952 3.33268 6.54952V5.50785H6.90852V14.4904H5.43102C4.97102 14.4904 4.59768 14.8629 4.59768 15.3237C4.59768 15.7845 4.97102 16.157 5.43102 16.157H10.1543C10.6143 16.157 10.9877 15.7845 10.9877 15.3237C10.9877 14.8629 10.6143 14.4904 10.1543 14.4904Z"
                fill="currentColor"
              />
            </svg>
          }
          active={activeSection === "font"}
          onClick={() => setActiveSection("font")}
          showArrow
        />
        <SettingsButton
          label="Change Password"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6848 7.87318V6.08402C13.6848 3.98985 11.9865 2.29148 9.89232 2.29148C7.79815 2.28235 6.09315 3.97235 6.08398 6.06735V6.08402V7.87318"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.0685 17.708H6.70102C4.95602 17.708 3.54102 16.2938 3.54102 14.548V10.9738C3.54102 9.22801 4.95602 7.81384 6.70102 7.81384H13.0685C14.8135 7.81384 16.2285 9.22801 16.2285 10.9738V14.548C16.2285 16.2938 14.8135 17.708 13.0685 17.708Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.88477 11.8356V13.6864"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          active={activeSection === "password"}
          onClick={() => setActiveSection("password")}
          showArrow
        />

        <button
          className="flex items-center gap-2 p-2 cursor-pointer"
          onClick={handleLogout}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5006 9.99875H7.45508M17.5006 9.99875L15.0577 7.55371M17.5006 9.99875L15.0577 12.4448"
              stroke="currentCOlor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.1296 6.88872V6.04237C12.1296 4.7427 11.1957 3.63316 9.92083 3.41799L5.58531 2.53739C3.97092 2.26493 2.5 3.5161 2.5 5.16177V14.8383C2.5 16.4839 3.97091 17.7351 5.5853 17.4626L9.92083 16.582C11.1957 16.3668 12.1296 15.2573 12.1296 13.9577V13.1122"
              stroke="currentCOlor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
