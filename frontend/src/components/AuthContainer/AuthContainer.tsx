import { Outlet } from "react-router-dom";

const AuthContainer = () => {
  return (
    <div className="p-4 flex flex-col justify-center items-center bg-[hsla(216,26%,96%,1)] h-screen">
      <div className="flex flex-col bg-white w-135 p-12 gap-4 rounded-xl border border-[hsla(216,19%,90%,1)] shadow-[0_4px_6px_hsla(0,0%,94%,0.6),0_2px_4px_hsla(0,0%,94%,0.5)] max-sm:w-full">
        <div className="flex justify-center">
          <img src="/logo.svg" alt="logo" className="w-max-[100%]" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthContainer;
