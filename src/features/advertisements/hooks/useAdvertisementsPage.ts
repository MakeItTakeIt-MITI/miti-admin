import { useMemo } from "react";
import { useAdvertisementsList } from "./query/useAdvertisementsList";

export const useAdvertisementsPage = (options?: { enabled?: boolean }) => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useAdvertisementsList(options);

  const rows = useMemo(() => data?.pages.flatMap((page) => page?.data?.items ?? []) ?? [], [data]);

  return { rows, hasNextPage, fetchNextPage, isFetching };
};
