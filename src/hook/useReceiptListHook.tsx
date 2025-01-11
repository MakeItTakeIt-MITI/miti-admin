import { useQuery } from "@tanstack/react-query";
import { gamePayments } from "../api/payments";

export const useGamePaymentsListHook = (
  page: number | null | undefined,
  year: number | null | undefined,
  month: number | null | undefined
) => {
  return useQuery({
    queryKey: ["결제완료 목록"],
    queryFn: () => gamePayments(page, year, month),
  });
};
