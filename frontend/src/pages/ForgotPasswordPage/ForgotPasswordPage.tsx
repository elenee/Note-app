import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface AuthFormValues {
  email: string;
}

interface IAuthFormProps {
  onSubmit?: (data: any, setError: any) => void;
}

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),
});

const ForgotPasswordPage = ({ onSubmit }: IAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormValues>({ resolver: yupResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit?.(data, setError))}
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col text-center gap-2">
        <h1 className="font-bold text-2xl leading-[1.2] tracking-[-0.03125rem] text-center">
          Forgotten your password?
        </h1>
        <p className="text-[hsla(222,11%,36%,1)] font-sans font-normal text-sm leading-[1.3] tracking-[-0.0125rem] text-center">
          Enter your email below, and we’ll send you a link to reset it.
        </p>
      </div>
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
          className="border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)] dark:border-[hsla(222,11%,36%,1)] dark:text-[hsla(221,8%,48%,1)]"
        />
        {errors.email && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}
      </div>
      <button className="bg-[hsla(228,100%,60%,1)] px-4 py-3 text-white rounded-lg cursor-pointer">
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPasswordPage;
