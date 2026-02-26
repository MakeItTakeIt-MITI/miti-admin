import { useInfiniteQuery } from "@tanstack/react-query";
import { gamesListData } from "../../api/games";

export const useGamesListHook = (search: string | null, game_status: string | null) => {
  return useInfiniteQuery({
    queryKey: ["Games List", search, game_status],
    queryFn: ({ pageParam }) => gamesListData(pageParam, 40, search, game_status),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },

    initialPageParam: null,
  });
};
