import { useInfiniteQuery } from "@tanstack/react-query";
import { gamesListData } from "../api/games";

export const useGamesListHook = (search: string | null) => {
  return useInfiniteQuery({
    queryKey: ["Games List", search],
    queryFn: ({ pageParam }) => gamesListData(pageParam, 40, search),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },

    initialPageParam: null,
  });
};
