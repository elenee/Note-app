import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/Auth/GoogleAuthButton";
import AuthForm from "../../components/Auth/AuthForm";

interface AuthFormValues {
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_BASE_URL

const SignUp = () => {
  const navigate = useNavigate();
  async function onSubmit(data: AuthFormValues) {
    try {
      const res = await axios.post(`${API_URL}/auth/sign-up`, data);
      if (res.status === 201) {
        navigate("/auth/sign-in");
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="font-sans font-bold text-2xl leading-[1.2] tracking-[-0.03125rem] text-center">
          Create Your Account
        </h1>
        <p className="text-[hsla(222,11%,36%,1)] font-sans font-normal text-sm leading-[1.3] tracking-[-0.0125rem] text-center">
          Sign up to start organizing your notes and boost your productivity.
        </p>
      </div>
      <AuthForm onSubmit={onSubmit} mode="signup" />
      <div className="flex flex-col text-center pt-6 pb-4 gap-4 border-y border-[hsla(216,19%,90%,1)]">
        <p className="text-[hsla(222,11%,36%,1)]">or login with:</p>
        <GoogleAuthButton />
      </div>
      <div className="flex justify-center items-center gap-1">
        <p className="text-[hsla(222,11%,36%,1)]">No account yet?</p>
        <Link to="/auth/sign-in">
          <p>Sign in</p>
        </Link>
      </div>
    </>
  );
};

export default SignUp;
