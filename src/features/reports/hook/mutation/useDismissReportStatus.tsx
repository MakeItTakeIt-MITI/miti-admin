import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { dismissReport, DismissPayload } from "../../api/report_update";

export const useDismissReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, data }: { reportId: number; data: DismissPayload }) =>
      dismissReport(reportId, data),
    onSuccess: (_, variables) => {
      toast.success("신고가 기각되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["report-detail", String(variables.reportId)] });
      queryClient.invalidateQueries({ queryKey: ["Reports List"] });
    },
    onError: () => {
      toast.error("신고 기각에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
