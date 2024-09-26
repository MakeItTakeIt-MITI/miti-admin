import axiosUrl from "../utils/axios";

export const reportsListData = async (page: number) => {
    try {
        const response = await axiosUrl.get('/admin/reports', { params: { page: page } })
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

export const dismissUserReport = async (reportedGameId: number | null) => {
    try {
        const response = await axiosUrl.post(`/admin/games/${reportedGameId}/reports/dismiss`)
        return response.data
    } catch {
        throw new Error
    }
}

export const penalizeGame = async (gameId: number | null, data: { penalty: string, duration: number | null }) => {
    try {
        const response = await axiosUrl.post(`/admin/games/${gameId}/reports/dismiss`, data)
        return response.data
    } catch {
        throw new Error
    }
}