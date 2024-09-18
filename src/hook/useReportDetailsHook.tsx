import { useQuery } from "@tanstack/react-query";
import { reportDetailData } from "../api/reports";

export const useReportDetailsHook = (reportId: number | null) => {
  return useQuery({
    queryKey: ["Report Details", reportId],
    queryFn: () => reportDetailData(reportId),
  });
};
