import axiosUrl from "../utils/axios";

export const reportsListData = async (page: number) => {
    try {
        const response = await axiosUrl.get('/admin/reports', { params: { page: page } })
        return response.data
    } catch {
        throw new Error
    }
};
export const reportDetailData = async (reportId: number | null) => {
    try {
        const response = await axiosUrl.get(`/admin/reports/${reportId}`)
        return response.data
    } catch {
        throw new Error
    }
};

export const dismissReport = async (reportId: number | null) => {
    try {
        const response = await axiosUrl.patch(`/admin/reports/${reportId}/dismiss`)
        return response.data
    } catch {
        throw new Error
    }
};
