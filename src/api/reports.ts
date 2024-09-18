import axiosUrl from "../utils/axios";

export const reportsListData = async (page: number) => {
    try {
        const response = await axiosUrl.get('/admin/reports', { params: { page: page } })
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