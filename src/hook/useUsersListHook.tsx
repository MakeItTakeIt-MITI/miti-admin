import { usersListData } from "../api/users";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUsersListHook = () => {
  return useInfiniteQuery({
    queryKey: ["Users"],
    queryFn: ({ pageParam = 1 }) => usersListData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log("lastPage:", lastPage);
      const nextPage = lastPage.current_index + 1;
      const hasNextPage = nextPage <= lastPage.end_index;

      return hasNextPage ? nextPage : null;
    },
  });
};
