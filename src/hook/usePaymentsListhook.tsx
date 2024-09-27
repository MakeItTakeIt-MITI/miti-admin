import { useQuery } from "@tanstack/react-query";
import { paymentsListData } from "../api/payments";

export const usePaymentsListhook = (page: number) => {
  return useQuery({
    queryKey: ["Payments List", page],
    queryFn: () => paymentsListData(page),
  });
};
