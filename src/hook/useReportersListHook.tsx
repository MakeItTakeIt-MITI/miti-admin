import { useQuery } from "@tanstack/react-query";
import { reportersUsersList } from "../api/reports";

export const useReportersListHook = (reportId: number | null) => {
  return useQuery({
    queryKey: ["Reporters List", reportId],
    queryFn: () => reportersUsersList(reportId),
  });
};
