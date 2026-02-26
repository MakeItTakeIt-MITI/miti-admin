import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReports } from "../../api/reports";

export const useReportsListHook = () => {
  return useInfiniteQuery({
    queryKey: ["Reports List"],
    queryFn: ({ pageParam }) => fetchReports(pageParam, 40),

    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },

    initialPageParam: null,
  });
};
