import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { GoogleIcon } from "../../Icons/Icons";

const API_URL = import.meta.env.VITE_BASE_URL;

const GoogleAuthButton = () => {
  const [, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response) => {
      const code = response.code;
      if (!code) return console.error("No authorization code returned!");

      try {
        const res = await axios.post(`${API_URL}/auth/google-login`, {
          code,
        });

        setCookie("accessToken", res.data.accessToken, {
          path: "/",
          maxAge: 3600,
        });
        navigate("/notes");
      } catch (err) {
        console.error("Backend login error:", err);
      }
    },
    onError: () => console.error("Login failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="border rounded-lg border-[hsla(219,15%,82%,1)] dark:border-[hsla(222,11%,36%,1)] hover:bg-[hsla(216,33%,97%,1)] dark:hover:bg-[hsla(231,16%,16%,1)] px-4 py-3 flex justify-center items-center gap-2 font-medium text-[16px] cursor-pointer"
    >
     <GoogleIcon/> 
      Google
    </button>
  );
};

export default GoogleAuthButton;
