import { useQuery } from "@tanstack/react-query";
import { reportsListData } from "../api/reports";

export const useReportsListHook = () => {
  return useQuery({
    queryKey: ["Reports list"],
    queryFn: reportsListData,
  });
};
