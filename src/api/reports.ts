import axiosUrl from "../utils/axios";

export const reportsListData = async () => {
    try {
        const response = await axiosUrl.get('/reports/report-reasons')
        return response.data
    } catch {
        throw new Error
    }
};
export const reportDetailData = async (id: number) => {
    try {
        const response = await axiosUrl.get(`/reports/report-reasons/${id}`)
        return response.data
    } catch {
        throw new Error
    }
};