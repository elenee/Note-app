import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

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
            cursor-pointer hover:bg-[hsla(216,33%,97%,1)] focus:ring-3 focus:ring-[hsla(221,8%,48%,1)]  ${errors.email ? "border-[hsla(355,96%,60%,1)]" : ""}`}
          />
          {errors.email && (
            <div className="flex gap-2 items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C2 11.3133 4.68605 14 8 14C11.3139 14 14 11.3133 14 8C14 4.68605 11.3139 2 8 2C4.68605 2 2 4.68605 2 8Z"
                  stroke="#FB3748"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.0038 10.4621V7.59573V10.4621ZM8 5.5695V5.52734V5.5695Z"
                  fill="#FB3748"
                />
                <path
                  d="M8.0038 10.4621V7.59573M8 5.5695V5.52734"
                  stroke="#FB3748"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
              cursor-pointer hover:bg-[hsla(216,33%,97%,1)] focus:ring-3 focus:ring-[hsla(221,8%,48%,1)] ${errors.password ? "border-[hsla(355,96%,60%,1)]" : ""}`}
              
            />
            <button
              className="absolute bottom-3.75 right-3 cursor-pointer"
              type="button"
              onClick={() => setIsVisible((prev) => !prev)}
            >
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
                  d="M10.0022 8.42888C8.89226 8.42888 7.99219 9.2924 7.99219 10.3585C7.99219 11.4239 8.89235 12.2881 10.0022 12.2881C11.112 12.2881 12.0122 11.4239 12.0122 10.3585C12.0122 9.2924 11.1122 8.42888 10.0022 8.42888ZM6.74219 10.3585C6.74219 8.62936 8.20214 7.22888 10.0022 7.22888C11.8023 7.22888 13.2622 8.62936 13.2622 10.3585C13.2622 12.0866 11.8023 13.4881 10.0022 13.4881C8.20201 13.4881 6.74219 12.0866 6.74219 10.3585Z"
                  fill="currentColor"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.1466 5.99548C5.64193 4.78181 7.70928 3.91687 10.002 3.91687C12.2942 3.91687 14.3615 4.78113 15.857 5.99451C17.3362 7.19468 18.337 8.80808 18.337 10.3585C18.337 11.9089 17.3362 13.5222 15.857 14.7224C14.3615 15.9358 12.2942 16.8001 10.002 16.8001C7.70928 16.8001 5.64193 15.9351 4.1466 14.7214C2.66762 13.521 1.66699 11.9077 1.66699 10.3585C1.66699 8.80928 2.66762 7.19588 4.1466 5.99548ZM4.95364 6.91186C3.64221 7.97626 2.91699 9.28368 2.91699 10.3585C2.91699 11.4333 3.64221 12.7406 4.95364 13.8051C6.24873 14.8562 8.03638 15.6001 10.002 15.6001C11.9673 15.6001 13.755 14.8567 15.0501 13.8059C16.3615 12.7418 17.087 11.4345 17.087 10.3585C17.087 9.28248 16.3615 7.97506 15.0501 6.91102C13.755 5.8602 11.9673 5.11687 10.002 5.11687C8.03638 5.11687 6.24873 5.86073 4.95364 6.91186Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          {errors.password && (
            <div className="flex gap-2 items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8C2 11.3133 4.68605 14 8 14C11.3139 14 14 11.3133 14 8C14 4.68605 11.3139 2 8 2C4.68605 2 2 4.68605 2 8Z"
                  stroke="#FB3748"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.0038 10.4621V7.59573V10.4621ZM8 5.5695V5.52734V5.5695Z"
                  fill="#FB3748"
                />
                <path
                  d="M8.0038 10.4621V7.59573M8 5.5695V5.52734"
                  stroke="#FB3748"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
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
