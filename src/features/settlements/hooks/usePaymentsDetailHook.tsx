import { useQuery } from "@tanstack/react-query";
import { fetchSettlementDetails } from "../api/settlements";

export const usePaymentsDetailHook = (requestId: number) => {
  return useQuery({
    queryKey: ["Payments Details"],
    queryFn: () => fetchSettlementDetails(requestId),
  });
};
