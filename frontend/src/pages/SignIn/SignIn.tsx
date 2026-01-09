import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import GoogleAuthButton from "../../components/Auth/GoogleAuthButton";
import AuthForm from "../../components/Auth/AuthForm";
import { showInvalidCredentialsToast } from "../../components/Common/CustomToast";

interface AuthFormValues {
  email: string;
  password: string;
}

const API_URL = import.meta.env.VITE_BASE_URL;

const SignIn = () => {
  const [, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  async function onSubmit(data: AuthFormValues) {
    try {
      const res = await axios.post(`${API_URL}/auth/sign-in`, data);
      const token = res.data.accessToken;
      if (res.status === 201 || res.status === 200) {
        setCookie("accessToken", token, {
          path: "/",
          maxAge: 60 * 60,
          secure: import.meta.env.PROD,
          sameSite: "lax",
        });
        console.log("Cookie set, navigating to /notes");
        navigate("/notes");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        showInvalidCredentialsToast();
      } else {
        console.error("Sign-in error:", error);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl leading-[1.2] tracking-[-0.03125rem] text-center">
          Welcome to Note
        </h1>
        <p className="text-[hsla(222,11%,36%,1)] dark:text-[hsla(219,15%,82%,1)] font-sans font-normal text-sm leading-[1.3] tracking-[-0.0125rem] text-center">
          Please log in to continue
        </p>
      </div>
      <AuthForm onSubmit={onSubmit} mode="login" />
      <div className="flex flex-col text-center pt-6 pb-4 gap-4 border-y border-[hsla(216,19%,90%,1)] dark:border-[hsla(222,11%,36%,1)]">
        <p className="text-[hsla(222,11%,36%,1)]">or login with:</p>
        <GoogleAuthButton />
      </div>
      <div className="flex justify-center items-center gap-1">
        <p className="text-[hsla(222,11%,36%,1)] dark:text-[hsla(219,15%,82%,1)]">
          No account yet?
        </p>
        <Link to="/auth/sign-up">
          <p className="text-black dark:text-white cursor-pointer hover:text-[hsla(228,100%,60%,1)]">
            Sign up
          </p>
        </Link>
      </div>
    </>
  );
};

export default SignIn;
