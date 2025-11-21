import { usersListData } from "../api/users";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUsersListHook = (search: string | null) => {
  return useInfiniteQuery({
    queryKey: ["Users", search],
    queryFn: ({ pageParam }) => usersListData(pageParam, 40, search),

    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },

    initialPageParam: null,
  });
};
