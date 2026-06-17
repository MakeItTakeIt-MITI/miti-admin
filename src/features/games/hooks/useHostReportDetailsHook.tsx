import { useQuery } from "@tanstack/react-query";
import { fetchHostReportInfo } from "../api/games";

export const useHostReportDetailsHook = (gameId: number) => {
  return useQuery({
    queryKey: ["Host Reports List", gameId],
    queryFn: () => fetchHostReportInfo(gameId),
  });
};
