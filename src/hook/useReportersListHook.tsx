import { useQuery } from "@tanstack/react-query";
import { reportersUsersList } from "../api/reports";

export const useReportersListHook = (gameId: number | null) => {
  return useQuery({
    queryKey: ["Reporters List", gameId],
    queryFn: () => reportersUsersList(gameId),
  });
};
