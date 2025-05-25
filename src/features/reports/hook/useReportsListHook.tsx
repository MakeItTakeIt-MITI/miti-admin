import { useQuery } from "@tanstack/react-query";
import { fetchReports } from "../api/reports";

export const useReportsListHook = (page: number) => {
  return useQuery({
    queryKey: ["Reports List"],
    queryFn: () => fetchReports(page),
  });
};
