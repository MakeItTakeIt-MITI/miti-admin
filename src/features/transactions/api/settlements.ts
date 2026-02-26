import axiosUrl from "../../../utils/axios";
import { TransferField } from "../interface/settlements";

export const fetchPaymentsList = async (
  cursor: number | null,
  limit: number,
  status: string | null,
) => {
  try {
    const response = await axiosUrl.get(`admin/transfer-requests`, {
      params: {
        cursor,
        limit,
        status,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const fetchTransferRequestDetails = async (requestId: number | null) => {
  try {
    const response = await axiosUrl.get(`/admin/transfer-requests/${requestId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchTransferStatus = async (requestId: number | null, data: TransferField) => {
  try {
    const response = await axiosUrl.patch(`/admin/transfer-requests`, { params: requestId, data });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
