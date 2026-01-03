import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
            className="text-[hsla(222,32%,8%,1)] font-medium leading-[1.2] tracking-[-0.0125rem] mb-px"
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            {...register("email")}
            className="border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)]"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor=""
            className="text-[hsla(222,32%,8%,1)] font-medium leading-[1.2] tracking-[-0.0125rem] mb-px"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="border rounded-lg px-4 py-3 border-[hsla(219,15%,82%,1)]"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="bg-[hsla(228,100%,60%,1)] px-2 py-1.5 text-white rounded-lg cursor-pointer"
        >
          {mode === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
