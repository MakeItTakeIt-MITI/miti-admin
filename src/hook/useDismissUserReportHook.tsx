import { useMutation } from "@tanstack/react-query";
import { dismissUserReport } from "../api/reports";

export const useDismissUserReportHook = () => {
  return useMutation({
    mutationFn: dismissUserReport,
  });
};
