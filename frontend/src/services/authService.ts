import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

const getCurrentUser = async (token: string) => {
  const res = await axios.get(`${API_URL}/auth/current-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("in auhservice: ", res.data);
  return res.data;
};

export default { getCurrentUser };
