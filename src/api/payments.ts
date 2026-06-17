import axiosUrl from "../utils/axios";

export const paymentsListData = async (page: number) => {
  try {
    const response = await axiosUrl.get("/admin/transfer-requests", { params: { page: page } });
    return response.data;
  } catch {
    throw new Error();
  }
};

export const paymentDetailData = async (transferId: number | null) => {
  try {
    const response = await axiosUrl.get(`/admin/transfer-requests/${transferId}`);
    return response.data;
  } catch {
    throw new Error();
  }
};
export const paymentStatusChange = async (
  transferId: number | null,
  data: {
    transfer_status: string;
  },
) => {
  try {
    const response = await axiosUrl.patch(`/admin/transfer-requests/${transferId}`, data);
    return response.data;
  } catch {
    throw new Error();
  }
};

export const gamePayments = async (
  page: number | null | undefined,
  year: number | null | undefined,
  month: number | null | undefined,
) => {
  try {
    const response = await axiosUrl.get(
      `/admin/payment-list?page=${page}&year=${year}&month=${month}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
