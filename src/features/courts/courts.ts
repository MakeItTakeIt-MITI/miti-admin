import axiosUrl from "../../utils/axios"

export const getCourtsList = async (cursor: null | string, size: number, search: string | null, province: string | null) => {
    try {
        const response = await axiosUrl.get('/admin/courts', {
            params: {
                cursor: cursor,
                size: size,
                search: search,
                province: province
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch courts list')

    }
}
export const getCourtsDetails = async (courtId: null | number) => {
    try {
        const response = await axiosUrl.get(`/admin/courts/${courtId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch court details')

    }
}