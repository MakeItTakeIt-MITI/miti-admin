import axiosUrl from "../../../utils/axios"

export const fetchReports = async (page: number) => {
    try {
        const response = await axiosUrl.get(`/admin/guest-reports?page=${page}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}