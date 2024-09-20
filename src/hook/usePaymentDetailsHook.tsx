import { useQuery } from "@tanstack/react-query";
import { paymentDetailData } from "../api/payments";

export const usePaymentDetailsHook = (transferId: number | null) => {
  return useQuery({
    queryKey: ["Payment Details", transferId],
    queryFn: () => paymentDetailData(transferId),
  });
};
