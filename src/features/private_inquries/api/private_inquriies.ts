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


export const privateInquiresDetails = async (inquiryId: number,) => {

    try {
        const response = await axiosUrl.get(`/admin/anonymous-questions/${inquiryId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching private inquiries:", error);
        throw error;
    }
}

export const privateInquiresDetailAnswer = async (inquiryId: number,) => {

    try {
        const response = await axiosUrl.get(`/admin/anonymous-questions/${inquiryId}/answers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching private inquiries:", error);
        throw error;
    }
}


export const postPrivateInquiresAnswer = async (inquiryId: number, data: { content: string }) => {

    try {
        const response = await axiosUrl.post(`/admin/anonymous-questions/${inquiryId}/answers`, data);
        return response.data;
    } catch (error) {
        console.error("Error posting private inquiry answer:", error);
        throw error;
    }
}