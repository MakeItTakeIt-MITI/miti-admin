import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReports } from "../../api/reports";

export const useReportsListHook = (status?: string[], search?: string) => {
  return useInfiniteQuery({
    queryKey: ["Reports List", { status, search }],
    queryFn: ({ pageParam }) => fetchReports(pageParam, 20, status, search),

    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },

    initialPageParam: null,
  });
};
