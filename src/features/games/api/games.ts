import axiosUrl from "../../../utils/axios"

export const fetchGameParticipants = async (game_id: number) => {
    try {
        const response = await axiosUrl(`/admin/games/${game_id}/participations`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchHostReportInfo = async (gameId: number) => {
    try {
        const response = await axiosUrl(`/admin/games/${gameId}/host-reports`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}