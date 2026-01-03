import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getCurrentUser = async (token: string) => {
  const res = await axios.get(`${API_URL}/auth/current-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export default { getCurrentUser };
