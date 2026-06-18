import axiosUrl from "../../../utils/axios";

export interface PenalizePayload {
  result?: string;
  penalty?: string;
  status?: string;
  duration?: number;
  content?: string;
  refund_participation_payment?: boolean;
  delete_post?: boolean;
}

export interface DismissPayload {
  result?: string;
  status?: string;
  penalty?: string;
  content?: string;
}

export const penalizeReport = async (reportId: number, data: PenalizePayload) => {
  const response = await axiosUrl.post(`/admin/reports/${reportId}/penalize`, data);
  return response.data;
};

export const dismissReport = async (reportId: number, data: DismissPayload) => {
  const response = await axiosUrl.post(`/admin/reports/${reportId}/dismiss`, data);
  return response.data;
};
