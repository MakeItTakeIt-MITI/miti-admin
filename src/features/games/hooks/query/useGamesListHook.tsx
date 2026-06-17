import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMatchList } from "../../api/games";

export const useGamesListHook = (
  search: string | null,
  status: string[],
  province: string[],
) => {
  return useInfiniteQuery({
    queryKey: ["Matches List", search, status, province],
    queryFn: ({ pageParam }) => fetchMatchList(pageParam, 40, search, status, province),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data ?? lastPage;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null as string | null,
  });
};
