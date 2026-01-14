import { Outlet } from "react-router-dom";
import Logo from "../Common/Logo";

const AuthContainer = () => {
  return (
    <div className="p-4 flex flex-col justify-center items-center bg-[hsla(216,26%,96%,1)] dark:bg-[hsla(221,16%,20%,1)] min-h-screen dark:text-white">
      <div className="
      w-full max-w-lg
      flex flex-col bg-white dark:bg-[hsla(222,32%,8%,1)] dark:border-[hsla(231,16%,16%,1)] p-12 gap-4 rounded-xl border border-[hsla(216,19%,90%,1)]">
        <div className="flex justify-center">
          <Logo />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthContainer;
