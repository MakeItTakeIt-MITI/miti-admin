import { useMemo, useState } from "react";
import { useGetTeamTransferRequests } from "./query/useGetTeamTransferRequests";
import { TeamTransferListItem } from "../interface/settlements";

export const useTeamTransferStatusesPage = () => {
  const [transferStatus] = useState<null | "completed" | "waiting" | "declined">(null);
  const { data, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage } =
    useGetTeamTransferRequests(transferStatus);

  const transferRequestData = data?.pages?.flatMap((page) => page?.data?.items as TeamTransferListItem[]);

  const rows = useMemo(() => {
    if (!transferRequestData) return [];
    return transferRequestData.filter((row): row is TeamTransferListItem => Boolean(row));
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
