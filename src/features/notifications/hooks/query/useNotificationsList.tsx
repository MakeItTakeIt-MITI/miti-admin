import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchNotifications } from "../../api/notifications";

export const useNotificationsList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? undefined;

  return useInfiniteQuery({
    queryKey: ["Notifications List", search],
    queryFn: ({ pageParam }) => fetchNotifications(pageParam as string | null, search),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      return data?.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null,
  });
};
