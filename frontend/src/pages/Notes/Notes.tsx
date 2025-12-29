import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Notes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["accessToken"]);

  async function currentUser(token: any) {
    try {
      const res = await axios.get("http://localhost:3000/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error: any) {
      navigate("/");
    }
  }

  useEffect(() => {
    const token = cookies.accessToken;
    setCookie("accessToken", token, {
      path: "/",
      maxAge: 60 * 60,
    });
    currentUser(token);
  }, []);
  if (!user) return null;

  return <div>Notes</div>;
};

export default Notes;
