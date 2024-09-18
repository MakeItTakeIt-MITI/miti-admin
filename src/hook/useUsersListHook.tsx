import { usersListData } from "../api/users";
import { useQuery } from "@tanstack/react-query";

export const useUsersListHook = (page: number) => {
  return useQuery({
    queryKey: ["Users", page],
    queryFn: () => usersListData(page),
  });
};
