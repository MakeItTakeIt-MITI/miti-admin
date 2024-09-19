import { useQuery } from "@tanstack/react-query";
import { paymentsListData } from "../api/payments";

export const usePaymentsListhook = (page: number) => {
  return useQuery({
    queryKey: ["Payments list", page],
    queryFn: () => paymentsListData(page),
  });
};
