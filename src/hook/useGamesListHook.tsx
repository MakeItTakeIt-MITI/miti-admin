import { useQuery } from "@tanstack/react-query";
import { gamesListData } from "../api/games";

export const useGamesListHook = (page: number) => {
  return useQuery({
    queryKey: ["Games List", page],
    queryFn: () => gamesListData(page),
  });
};
