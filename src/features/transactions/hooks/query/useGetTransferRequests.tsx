import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPaymentsList } from "../../api/settlements";

export const useGetTransferRequests = (status: string | null) => {
  return useInfiniteQuery({
    queryKey: ["Transfer Request List", status],
    queryFn: ({ pageParam }) => fetchPaymentsList(pageParam, 40, status),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage.has_more ? lastPage.page_last_cursor : undefined;
    },
    initialPageParam: null,
  });
};
