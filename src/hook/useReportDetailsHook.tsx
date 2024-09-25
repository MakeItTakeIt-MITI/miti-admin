import { useQuery } from "@tanstack/react-query";
import { reportDetailData } from "../api/reports";

export const useReportDetailsHook = (
  gameId: number | null,
  reportId: number | null
) => {
  return useQuery({
    queryKey: ["Report Details", gameId, reportId],
    queryFn: () => reportDetailData(gameId, reportId),
  });
};
