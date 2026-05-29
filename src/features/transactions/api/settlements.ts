import axiosUrl from "../../../utils/axios";
import { TransferField } from "../interface/settlements";

export const fetchPaymentsList = async (
  cursor: string | null,
  limit: number,
  status: string | null,
) => {
  const response = await axiosUrl.get(`/admin/transfer-requests`, {
    params: { cursor, limit, status },
  });
  return response.data;
};

export const fetchTransferRequestDetails = async (requestId: number | null) => {
  const response = await axiosUrl.get(`/admin/transfer-requests/${requestId}`);
  return response.data;
};

export const patchTransferStatus = async (requestId: number | null, data: TransferField) => {
  const response = await axiosUrl.patch(`/admin/transfer-requests/${requestId}`, data);
  return response.data;
};

export const fetchTeamTransferRequestsList = async (
  cursor: string | null,
  limit: number,
  status: string | null,
) => {
  const response = await axiosUrl.get(`/admin/team-transfer-requests`, {
    params: { cursor, limit, status },
  });
  return response.data;
};

export const fetchTeamTransferRequestDetails = async (requestId: number | null) => {
  const response = await axiosUrl.get(`/admin/team-transfer-requests/${requestId}`);
  return response.data;
};

export const patchTeamTransferStatus = async (requestId: number | null, data: TransferField) => {
  const response = await axiosUrl.patch(`/admin/team-transfer-requests/${requestId}`, data);
  return response.data;
};
