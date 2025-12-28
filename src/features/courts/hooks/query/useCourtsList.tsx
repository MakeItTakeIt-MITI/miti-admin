import { useInfiniteQuery } from "@tanstack/react-query";
import { getCourtsList } from "../../courts";

export const useCourtsList = (
  search: string | null,
  province: string | null
) => {
  return useInfiniteQuery({
    queryKey: ["courtsList", search, province],
    queryFn: ({ pageParam }) => getCourtsList(pageParam, 40, search, province),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },

    initialPageParam: null,
  });
};
