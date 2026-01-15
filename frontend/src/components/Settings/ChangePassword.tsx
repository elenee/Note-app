import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import authService from "../../services/authService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showPasswordUpdatedToast } from "../Common/CustomToast";
import { EyeIcon, InfoIcon } from "../../Icons/Icons";


type ChangePasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = yup.object({
  oldPassword: yup.string().required("old password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm new password"),
});

const ChangePassword = () => {
  const [cookies, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const [visible, setVisible] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const toggleVisibility = (field: keyof typeof visible) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      await authService.changePassword(
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
        cookies.accessToken
      );

      showPasswordUpdatedToast();

      removeCookie("accessToken", {
        path: "/",
        secure: import.meta.env.PROD,
        sameSite: "lax",
      });

      delete axios.defaults.headers.common["Authorization"];

      navigate("/auth/signin");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError("oldPassword", {
          type: "manual",
          message: error.response.data.message,
        });
      }
      console.log("could not change password", error.message);
    }
  };

  return (
    <div className="max-w-132 w-full flex flex-col gap-6">
      <h1 className="text-[16px] text-[hsla(222,32%,8%,1)] font-semibold">
        Change Password
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label
              htmlFor=""
              className="text-[hsla(222,32%,8%,1)] text-[14px] font-medium leading-[1.2] tracking-[-0.0125rem] mb-px dark:text-white"
            >
              Old Password
            </label>
          </div>
          <div className="relative">
            <input
              type={visible.old ? "text" : "password"}
              {...register("oldPassword")}
              className={`w-full border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)] dark:border-[hsla(222,11%,36%,1)] ${
                errors.oldPassword ? "border-[hsla(355,96%,60%,1)]" : ""
              }`}
            />
            <button
              className="absolute bottom-3.75 right-3 cursor-pointer"
              type="button"
              onClick={() => toggleVisibility("old")}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.oldPassword && (
            <div className="flex items-center gap-2">
              <InfoIcon />
              <p className="text-red-500">{errors.oldPassword?.message}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label
              htmlFor=""
              className="text-[hsla(222,32%,8%,1)] text-[14px] font-medium leading-[1.2] tracking-[-0.0125rem] mb-px dark:text-white"
            >
              New Password
            </label>
          </div>
          <div className="relative">
            <input
              type={visible.new ? "text" : "password"}
              {...register("newPassword")}
              className={`w-full border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)] dark:border-[hsla(222,11%,36%,1)] ${
                errors.newPassword ? "border-[hsla(355,96%,60%,1)]" : ""
              }`}
            />
            <button
              className="absolute bottom-3.75 right-3 cursor-pointer"
              type="button"
              onClick={() => toggleVisibility("new")}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.newPassword && (
            <div className="flex items-center gap-2">
              <InfoIcon />
              <p className="text-red-500">{errors.newPassword?.message}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label
              htmlFor=""
              className="text-[hsla(222,32%,8%,1)] text-[14px] font-medium leading-[1.2] tracking-[-0.0125rem] mb-px dark:text-white"
            >
              Confirm New Password
            </label>
          </div>
          <div className="relative">
            <input
              type={visible.confirm ? "text" : "password"}
              {...register("confirmNewPassword")}
              className={`w-full border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)] dark:border-[hsla(222,11%,36%,1)] ${
                errors.confirmNewPassword ? "border-[hsla(355,96%,60%,1)]" : ""
              }`}
            />
            <button
              className="absolute bottom-3.75 right-3 cursor-pointer"
              type="button"
              onClick={() => toggleVisibility("confirm")}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.confirmNewPassword && (
            <div className="flex items-center gap-2">
              <InfoIcon />
              <p className="text-red-500">
                {errors.confirmNewPassword?.message}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end w-full">
          <button className="px-4 py-3 rounded-lg text-white bg-[hsla(228,100%,60%,1)]">
            Save Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
