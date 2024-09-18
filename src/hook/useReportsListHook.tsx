import { useQuery } from "@tanstack/react-query";
import { reportsListData } from "../api/reports";

export const useReportsListHook = (page: number) => {
  return useQuery({
    queryKey: ["Reports list", page],
    queryFn: () => reportsListData(page),
  });
};
