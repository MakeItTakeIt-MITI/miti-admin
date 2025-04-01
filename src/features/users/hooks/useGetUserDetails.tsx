import { useQuery } from "@tanstack/react-query";
import { fetchUserDetail } from "../api/users";

export const useGetUserDetails = (user_id: number) => {
  return useQuery({
    queryKey: ["User Details", user_id],
    queryFn: () => fetchUserDetail(user_id),
  });
};
