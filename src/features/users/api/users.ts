import axiosUrl from "../../../utils/axios";

export const fetchUserDetail = async (user_id: number) => {
  try {
    const response = await axiosUrl.get(`admin/users/${user_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
