import axiosUrl from "../../../utils/axios"

export const fetchReports = async (cursor: string | null, limit: number) => {
    try {
        const response = await axiosUrl.get(`/admin/reports`, { params: { cursor, limit } })
        return response.data
    } catch (error) {
        console.log(error)
    }
}