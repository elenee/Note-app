import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export type ChanegePasswordDto = {
  oldPassword: string;
  newPassword: string;
};

const getCurrentUser = async (token: string) => {
  const res = await axios.get(`${API_URL}/auth/current-user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const changePassword = async (data: ChanegePasswordDto, token: string) => {
  const res = await axios.patch(`${API_URL}/auth/change-password`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(res.data);
  return res.data;
};

export default { getCurrentUser, changePassword };
