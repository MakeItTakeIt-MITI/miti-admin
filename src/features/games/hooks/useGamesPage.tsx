import { useSearchParams } from "react-router-dom";
import { useGamesListHook } from "../../../hook/useGamesListHook";

export const useGamesPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  // const { data } = useUsersListHook(currentPage);
  const {
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useGamesListHook(search);

  const gamesDataPage = data?.pages?.flatMap((page) => page?.data?.items);

  return {
    gamesDataPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  };
};
