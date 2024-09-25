import axiosUrl from "../utils/axios";

export const reportsListData = async (page: number) => {
    try {
        const response = await axiosUrl.get('/admin/reports', { params: { page: page } })
        return response.data
    } catch {
        throw new Error
    }
};
export const reportDetailData = async (gameId: number | null, reportId: number | null) => {
    try {
        const response = await axiosUrl.get(`/admin/games/${gameId}/reports/${reportId}`)
        return response.data
    } catch {
        throw new Error
    }
};
export const reportersUsersList = async (gameId: number | null) => {
    try {
        const response = await axiosUrl.get(`/admin/games/${gameId}/reports`)
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
