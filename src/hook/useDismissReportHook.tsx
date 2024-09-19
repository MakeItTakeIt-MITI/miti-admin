import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dismissReport } from "../api/reports";

export const useDismissReportHook = (reportId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dismissReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reports list"] });
    },
  });
};
