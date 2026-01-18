import axiosUrl from "../../../utils/axios"

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
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        console.log(error)
        throw new Error('Failed to fetch court details')

    }
}

interface CourtPatchPayload {
    name?: string;

    info?: string;
    images?: string[];
}
export const patchCourtsDetails = async (
    courtId: number,
    data: CourtPatchPayload
) => {
    const response = await axiosUrl.patch(
        `/admin/courts/${courtId}`,
        data
    );
    return response.data;
};

//파일 업로드 url 조회 API																			
export const getFileUploadUrl = async () => {
    try {
        const response = await axiosUrl.get('/file-upload-url?category=court_image&png=1')
        return response.data
    } catch (error) {
        console.log(error)
    }
}