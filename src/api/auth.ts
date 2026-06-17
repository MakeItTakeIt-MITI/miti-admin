import axiosUrl from "../utils/axios";

export const authLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await axiosUrl.post("/admin/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
