import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, InfoIcon } from "../../Icons/Icons";

type AuthMode = "login" | "signup";

interface AuthFormValues {
  email: string;
  password: string;
}

interface IAuthFormProps {
  onSubmit: (data: AuthFormValues, setError: any) => void;
  mode: AuthMode;
}

const schema = (mode: AuthMode) =>
  yup.object({
    email: yup
      .string()
      .trim()
      .email("Enter a valid email address")
      .required("Email is required"),

    password:
      mode === "login"
        ? yup.string().required("Password is required")
        : yup
            .string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters"),
  });

const AuthForm = ({ onSubmit, mode }: IAuthFormProps) => {
  const getSchema = schema(mode);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AuthFormValues>({ resolver: yupResolver(getSchema) });

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, setError))}
        className="flex flex-col pt-6 gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor=""
            className="text-[hsla(222,32%,8%,1)] font-medium leading-[1.2] tracking-[-0.0125rem] mb-px dark:text-white"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            {...register("email")}
            className={`border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)] dark:border-[hsla(222,11%,36%,1)] dark:text-[hsla(221,8%,48%,1)] dark:hover:bg-[hsla(231,16%,16%,1)]
            cursor-pointer hover:bg-[hsla(216,33%,97%,1)] focus:ring-3 focus:ring-[hsla(221,8%,48%,1)]  ${
              errors.email ? "border-[hsla(355,96%,60%,1)]" : ""
            }`}
          />
          {errors.email && (
            <div className="flex gap-2 items-center">
              <InfoIcon />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <label
              htmlFor=""
              className="text-[hsla(222,32%,8%,1)] font-medium leading-[1.2] tracking-[-0.0125rem] mb-px dark:text-white"
            >
              Password
            </label>
            {mode === "login" && (
              <Link
                to="/auth/forgot-password"
                className="underline text-[hsla(222,11%,36%,1)] dark:text-[hsla(220,11%,64%,1)] cursor-pointer hover:text-[hsla(228,100%,60%,1)]"
              >
                forgot
              </Link>
            )}
          </div>
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              {...register("password")}
              className={`w-full border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)] dark:border-[hsla(222,11%,36%,1)] dark:hover:bg-[hsla(231,16%,16%,1)]
              cursor-pointer hover:bg-[hsla(216,33%,97%,1)] focus:ring-3 focus:ring-[hsla(221,8%,48%,1)] ${
                errors.password ? "border-[hsla(355,96%,60%,1)]" : ""
              }`}
            />
            <button
              className="absolute bottom-3.75 right-3 cursor-pointer"
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              <EyeIcon />
            </button>
          </div>
          {errors.password && (
            <div className="flex gap-2 items-center">
              <InfoIcon />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="bg-[hsla(228,100%,60%,1)] px-2 py-1.5 text-white rounded-lg 
          cursor-pointer hover:bg-[hsla(228,70%,48%,1)] focus:ring-2 focus:ring-[hsla(221,8%,48%,1)]"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
