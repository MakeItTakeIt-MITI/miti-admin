import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTeamTransferRequestsList } from "../../api/settlements";

export const useGetTeamTransferRequests = (status: string | null) => {
  return useInfiniteQuery({
    queryKey: ["Team Transfer Request List", status],
    queryFn: ({ pageParam }) => fetchTeamTransferRequestsList(pageParam, 40, status),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null,
  });
};
