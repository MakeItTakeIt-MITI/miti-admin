import { useQuery } from "@tanstack/react-query";
import { fetchTransferRequestDetails } from "../api/settlements";

export const useTransferRequestDetails = (requestId: number | null) => {
  return useQuery({
    queryKey: ["Transfer Request Details", requestId],
    queryFn: () => fetchTransferRequestDetails(requestId),
  });
};
