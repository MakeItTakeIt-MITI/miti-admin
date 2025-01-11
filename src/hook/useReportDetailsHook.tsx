import { useQuery } from "@tanstack/react-query";
import { reportDetailData } from "../api/reports";

export const useReportDetailsHook = (
  reported_game_id: number | null,
  report_id: number | null
) => {
  return useQuery({
    queryKey: [
      "Report Details",
      "reported game id:",
      reported_game_id,
      "reported id:",
      report_id,
    ],
    queryFn: () => reportDetailData(reported_game_id, report_id),
  });
};
