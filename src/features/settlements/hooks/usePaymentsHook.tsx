import { useQuery } from "@tanstack/react-query";
import { fetchPaymentsList } from "../api/settlements";

export const usePaymentsHook = (page: number) => {
  return useQuery({
    queryKey: ["Payments List"],
    queryFn: () => fetchPaymentsList(page),
  });
};
