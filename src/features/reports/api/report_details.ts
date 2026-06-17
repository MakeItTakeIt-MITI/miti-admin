import axiosUrl from "../../../utils/axios";

export const getReportDetails = async (reportId: number) => {
  try {
    const response = await axiosUrl.get(`/admin/reports/${reportId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
