import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInquiryList } from "../../api/support";

export const useInquiriesListHook = (search: string | null) => {
  return useInfiniteQuery({
    queryKey: ["User Inquiries List", search],
    queryFn: ({ pageParam }) => fetchInquiryList(pageParam, 40, search),
    initialPageParam: null,

    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
  });
};
