import axiosUrl from "../utils/axios";

export const gamesListData = async (page: number) => {
    try {
        const response = await axiosUrl.get('/admin/games', { params: { page: page } })
        return response.data
    } catch {
        throw new Error
    }
};

export const gameDetailsData = async (gameId: number | null) => {
    try {
        const response = await axiosUrl.get(`/admin/games/${gameId}`)
        return response.data
    } catch {
        throw new Error
    }
};