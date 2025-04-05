import axiosUrl from "../../../utils/axios";

export const fetchInquiryList = async (page: number) => {
    try {
        const response = await axiosUrl.get(`/admin/user-questions?page=${page}`)
        return response.data
    } catch {
        throw new Error
    }
};

export const fetchInquiryDetails = async (inquiryId: number | null) => {
    try {
        const response = await axiosUrl.get(`/admin/user-questions/${inquiryId}`)
        return response.data
    } catch {
        throw new Error
    }
}

export interface AnswerField {
    content: string
}

