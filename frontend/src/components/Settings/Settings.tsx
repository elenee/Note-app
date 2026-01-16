import { useCookies } from "react-cookie";
import axios from "axios";
import SettingsButton from "./SettingsButton ";
import { FontIcon, LockIcon, LogOutIcon, SunIcon } from "../../Icons/Icons";
import { NavLink, Outlet } from "react-router-dom";

const Settings = () => {
  const [, removeCookie] = useCookies(["accessToken"]);

  const handleLogout = () => {
    removeCookie("accessToken", {
      path: "/",
      secure: import.meta.env.PROD,
      sameSite: "lax",
    });

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <div className="flex">
      <div className="w-72.5 max-xl:w-58 min-w-50 shrink-0 pl-8 pr-4 pt-5 flex flex-col gap-2 border-r border-[hsla(216,19%,90%,1)] dark:border-[hsla(231,16%,16%,1)] h-screen">
        <NavLink to="color">
          {({ isActive }) => (
            <SettingsButton
              label="Color Theme"
              icon={<SunIcon />}
              active={isActive}
              showArrow
            />
          )}
        </NavLink>

        <NavLink to="font">
          {({ isActive }) => (
            <SettingsButton
              label="Font Theme"
              icon={<FontIcon />}
              active={isActive}
              showArrow
            />
          )}
        </NavLink>

        <NavLink to="password">
          {({ isActive }) => (
            <SettingsButton
              label="Change Password"
              icon={<LockIcon />}
              active={isActive}
              showArrow
            />
          )}
        </NavLink>

        <button
          className="flex items-center gap-2 p-2 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOutIcon />
          Log out
        </button>
      </div>

      <div className="flex-1 p-6 w-full">
        {/* {activeSection === "color" && (
          <ColorTheme selected={colorTheme} onChange={setColorTheme} />
        )}
        {activeSection === "font" && (
          <FontTheme selected={fontTheme} onChange={setFontTheme} />
        )}
        {activeSection === "password" && <ChangePassword />} */}
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
