import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewsList } from "../../api/reviews";

export const useReviewsList = (search: string | null, reviewType: string[]) => {
  return useInfiniteQuery({
    queryKey: ["reviewsList", search, reviewType],
    queryFn: ({ pageParam }) => getReviewsList(pageParam, 20, search, reviewType),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null as string | null,
  });
};
