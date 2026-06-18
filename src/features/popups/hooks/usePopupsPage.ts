import { useMemo } from "react";
import { usePopupsList } from "./query/usePopupsList";

export const usePopupsPage = (options?: { enabled?: boolean }) => {
  const { data, hasNextPage, fetchNextPage, isFetching } = usePopupsList(options);

  const rows = useMemo(() => data?.pages.flatMap((page) => page?.data?.items ?? []) ?? [], [data]);

  return { rows, hasNextPage, fetchNextPage, isFetching };
};
