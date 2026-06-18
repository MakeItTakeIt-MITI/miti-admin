import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useReportsListHook } from "./query/useReportsListHook";

export const useReportsPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.getAll("status");
  const search = searchParams.get("search") ?? undefined;

  const {
    data: reportsData,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useReportsListHook(status.length > 0 ? status : undefined, search);

  const reportsDataPage = reportsData?.pages.flatMap((page) => page?.data?.items ?? []);

  const rows = useMemo(() => {
    if (!reportsDataPage) return [];
    return reportsDataPage;
  }, [reportsDataPage]);

  return {
    rows,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  };
};
