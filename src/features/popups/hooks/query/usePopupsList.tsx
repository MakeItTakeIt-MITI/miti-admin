import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchPopups } from "../../api/popups";
import { PopupStatus } from "../../interface/popups";

export const usePopupsList = (options?: { enabled?: boolean }) => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const status = statusParam ? (statusParam.split(",") as PopupStatus[]) : undefined;

  return useInfiniteQuery({
    queryKey: ["Popups List", status],
    queryFn: ({ pageParam }) => fetchPopups(pageParam as string | null, 20, { status }),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null as string | null,
    enabled: options?.enabled,
  });
};
