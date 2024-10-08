import axiosUrl from "../utils/axios";

export const privateInquiriesData = async (page: number) => {
    try {
        const response = await axiosUrl.get(`/support/anonymous-questions?page=${page}`)
        return response.data
    } catch {
        throw new Error
    }
};

export const privateInquiryDetails = async (inquiryId: number | null) => {
    try {
        const response = await axiosUrl.get(`/admin/anonymous-questions/${inquiryId}`)
        return response.data
    } catch {
        throw new Error
    }
}

export interface AnswerField {
    content: string
}

export const answerInquiry = async (inquiryId: number | null, content: AnswerField) => {
    try {
        const response = await axiosUrl.post(`/admin/anonymous-questions/${inquiryId}/answers`, content)
        return response.data
    } catch {
        throw new Error
    }
}