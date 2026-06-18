import axiosUrl from "../../../utils/axios";

export const fetchReports = async (
  cursor: string | null,
  limit: number,
  status?: string[],
  search?: string,
) => {
  try {
    const response = await axiosUrl.get(`/admin/reports`, {
      params: { cursor, limit, status, search },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
