import { useInfiniteQuery } from "@tanstack/react-query";
import { privateInquiresList } from "../../api/private_inquriies";

export const usePrivateInquiries = (search: string | null) => {
  return useInfiniteQuery({
    queryKey: ["privateInquiries", search],
    queryFn: ({ pageParam }) => privateInquiresList(pageParam, 20, search),

    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },

    initialPageParam: null,
  });
};
