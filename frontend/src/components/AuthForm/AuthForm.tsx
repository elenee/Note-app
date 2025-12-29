import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface IAuthFormProps {
  onSubmit: (data: any) => void;
  submitLabel: string;
}

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const AuthForm = ({ onSubmit, submitLabel }: IAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <div>
      <form
          onSubmit={handleSubmit(onSubmit)}
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
            {errors.email?.message}
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
            {errors.password?.message}
          </div>
          <button className="bg-[hsla(228,100%,60%,1)] px-2 py-1.5 text-white rounded-lg cursor-pointer">
            Sign Up
          </button>
        </form>
    </div>
  );
};

export default AuthForm;
