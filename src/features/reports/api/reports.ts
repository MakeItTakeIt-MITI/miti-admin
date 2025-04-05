import axiosUrl from "../../../utils/axios"

export const fetchReports = async () => {
    try {
        const response = await axiosUrl.get(`/admin/guest-reports`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}