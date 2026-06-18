import { useMemo } from "react";
import { useNotificationsList } from "./query/useNotificationsList";
import { NotificationItem } from "../interface/notifications";

export const useNotificationsPage = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useNotificationsList();

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page?.data?.items ?? []) ?? [],
    [data],
  ) as NotificationItem[];

  return { rows, hasNextPage, fetchNextPage, isFetching };
};
