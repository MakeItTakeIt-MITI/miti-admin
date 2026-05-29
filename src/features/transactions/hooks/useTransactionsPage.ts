import { useMemo, useState } from "react";
import { useGetTransferRequests } from "./query/useGetTransferRequests";
import { SettlementsListItem } from "../interface/settlements";

export const useTransferStatusesPage = () => {
  const [transferStatus] = useState<null | "completed" | "waiting" | "declined">(null);
  const { data, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage } =
    useGetTransferRequests(transferStatus);

  const transferRequestData = data?.pages?.flatMap((page) => page?.data?.items as SettlementsListItem[]);

  const rows = useMemo(() => {
    if (!transferRequestData) return [];
    return transferRequestData.filter((row): row is SettlementsListItem => Boolean(row));
  }, [transferRequestData]);

  return {
    transferRequestData,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    rows,
  };
};
