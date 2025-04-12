import { useQuery } from "@tanstack/react-query";
import { fetchHostReportInfo } from "../api/games";

export const useHostReportDetailsHook = (gameId: number) => {
  return useQuery({
    queryKey: ["Host Report Info", gameId],
    queryFn: () => fetchHostReportInfo(gameId),
  });
};
