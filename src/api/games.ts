import axiosUrl from "../utils/axios";

export const gamesListData = async (cursor: number | null, limit: number, search: string | null, game_status: string | null) => {
    try {
        const response = await axiosUrl.get('/admin/games', { params: { cursor, limit, search, game_status } })
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