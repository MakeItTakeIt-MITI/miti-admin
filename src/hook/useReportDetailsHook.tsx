import { useQuery } from "@tanstack/react-query";
import { reportDetailData } from "../api/reports";

export const useReportDetailsHook = (id: number) => {
  return useQuery({
    queryKey: ["Report Details", id],
    queryFn: () => reportDetailData(id),
  });
};
