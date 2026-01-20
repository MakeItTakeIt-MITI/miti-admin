import { useSearchParams } from "react-router-dom";
import { useGamesListHook } from "./query/useGamesListHook";
import { useMemo, useState } from "react";

export const useGamesPage = () => {
  const [status, setStatus] = useState<null | string>(null);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const {
    data,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useGamesListHook(search, status);

  const gamesDataPage = data?.pages?.flatMap((page) => page?.data?.items);

  const rows = useMemo(() => {
    if (!gamesDataPage) return [];
    if (Array.isArray(gamesDataPage)) return gamesDataPage;

    return gamesDataPage;
  }, [gamesDataPage]);
  return {
    gamesDataPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    rows,
    status,
    setStatus,
  };
};
