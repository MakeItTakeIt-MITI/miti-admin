import { useSearchParams } from "react-router-dom";
import { useGamesListHook } from "./query/useGamesListHook";
import { useMemo, useState } from "react";

export const useGamesPage = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [province, setProvince] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const statusArr = status ? [status] : [];
  const provinceArr = province ? [province] : [];

  const { data, hasNextPage, fetchNextPage } = useGamesListHook(search, statusArr, provinceArr);

  const gamesDataPage = data?.pages?.flatMap((page) => {
    const pageData = page?.data ?? page;
    return pageData?.items ?? [];
  });

  const rows = useMemo(() => {
    if (!gamesDataPage) return [];
    return gamesDataPage;
  }, [gamesDataPage]);

  return {
    gamesDataPage,
    hasNextPage,
    fetchNextPage,
    rows,
    status,
    setStatus,
    province,
    setProvince,
  };
};
