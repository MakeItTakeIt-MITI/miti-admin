import { useInfiniteQuery } from "@tanstack/react-query";
import { usersListData } from "../../../../api/users";

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
