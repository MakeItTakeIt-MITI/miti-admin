import axiosUrl from "../../../utils/axios"


export const privateInquiresList = async () => {

    try {
        const resposne = await axiosUrl.get('admin/anonymous-questions/');
        return resposne.data;
    } catch (error) {
        console.error("Error fetching private inquiries:", error);
        throw error;
    }
}


export const privateInquiresDetails = async (id: number, cursor: string | null, limit: number, search: string | null) => {

    try {
        const resposne = await axiosUrl.get(`admin/anonymous-questions/${id}`, { params: { cursor, limit, search } });
        return resposne.data;
    } catch (error) {
        console.error("Error fetching private inquiries:", error);
        throw error;
    }
}
