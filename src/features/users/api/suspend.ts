import axiosUrl from "../../../utils/axios";

export const suspendUser = async (userId: number, days: number) => {
  try {
    const response = axiosUrl.patch(`/admin/users/${userId}/suspend`, { days: days });
    return response;
  } catch (error) {
    console.log(error);
  }
};
