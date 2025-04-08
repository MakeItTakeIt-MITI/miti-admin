import { useQuery } from "@tanstack/react-query";
import { fetchSettlementDetails } from "../api/settlements";

export const usePaymentsDetailHook = (transferId: number) => {
  return useQuery({
    queryKey: ["Payments Details"],
    queryFn: () => fetchSettlementDetails(transferId),
  });
};
