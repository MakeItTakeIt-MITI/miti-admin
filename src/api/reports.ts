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

export const reportDetailData = async (reported_game_id: null | number, report_id: number | null) => {
    try {
        const response = await axiosUrl.get(`/admin/games/${reported_game_id}/reports/${report_id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const dismissUserReport = async (reportedGameId: number | null) => {
    try {
        const response = await axiosUrl.post(`/admin/games/${reportedGameId}/reports/dismiss`)
        return response.data
    } catch {
        throw new Error
    }
}

export const penalizeGame = async (gameId: number | null, data: { penalty: string, duration: number | null, refund_participation_payment: boolean | undefined }) => {
    try {
        const response = await axiosUrl.post(`/admin/games/${gameId}/reports/dismiss`, data)
        return response.data
    } catch {
        throw new Error
    }
}



// export const warningGame = async (gameId: number | null, data: { penalty: string, duration: number | null }) => {
//     try {
//         const response = await axiosUrl.post(`/admin/games/${gameId}/reports/dismiss`, data)
//         return response.data
//     } catch {
//         throw new Error
//     }
// }