import { useInfiniteQuery } from "@tanstack/react-query";
import { getTeamsList } from "../../api/teams";

export const useTeamsList = (search: string | null, status: string[]) => {
  return useInfiniteQuery({
    queryKey: ["teamsList", search, status],
    queryFn: ({ pageParam }) => getTeamsList(pageParam, 20, search, status),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_next ? data.next_cursor : undefined;
    },
    initialPageParam: null as string | null,
  });
};
