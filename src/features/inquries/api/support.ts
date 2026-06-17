import axiosUrl from "../../../utils/axios";

export const fetchInquiryList = async (
  cursor: number | null,
  size: number,
  search: string | null,
) => {
  try {
    const response = await axiosUrl.get(`/admin/user-questions`, {
      params: { cursor, size, search },
    });
    return response.data;
  } catch {
    throw new Error();
  }
};

export const fetchInquiryDetails = async (inquiryId: number | null) => {
  try {
    const response = await axiosUrl.get(`/admin/user-questions/${inquiryId}`);
    return response.data;
  } catch {
    throw new Error();
  }
};

export const addInquiryReply = async (questionId: number, content: string) => {
  try {
    const response = await axiosUrl.post(`/admin/user-questions/${questionId}/answers`, {
      content,
    });
    return response.data;
  } catch {
    throw new Error();
  }
};
export interface AnswerField {
  content: string;
}
