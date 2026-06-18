import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchAdvertisements } from "../../api/advertisements";
import { AdvertisementStatus } from "../../interface/advertisements";

export const useAdvertisementsList = (options?: { enabled?: boolean }) => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const status = statusParam ? (statusParam.split(",") as AdvertisementStatus[]) : undefined;

  return useInfiniteQuery({
    queryKey: ["Advertisements List", status],
    queryFn: ({ pageParam }) => fetchAdvertisements(pageParam as string | null, 20, { status }),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null as string | null,
    enabled: options?.enabled,
  });
};
