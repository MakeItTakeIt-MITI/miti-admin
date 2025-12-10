import axiosUrl from "../../../utils/axios"


export const privateInquiresList = async (cursor: string | null, limit: number, search: string | null) => {

    try {
        const response = await axiosUrl.get('/admin/anonymous-questions', { params: { cursor, limit, search } });
        return response.data;
    } catch (error) {
        console.error("Error fetching private inquiries:", error);
        throw error;
    }
}


export const privateInquiresDetails = async (id: number, cursor: string | null, limit: number, search: string | null) => {

    try {
        const resposne = await axiosUrl.get(`/admin/anonymous-questions/${id}`, { params: { cursor, limit, search } });
        return resposne.data;
    } catch (error) {
        console.error("Error fetching private inquiries:", error);
        throw error;
    }
}
