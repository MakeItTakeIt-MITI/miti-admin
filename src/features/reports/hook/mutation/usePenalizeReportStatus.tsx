import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { penalizeReport, PenalizePayload } from "../../api/report_update";

export const usePenalizeReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, data }: { reportId: number; data: PenalizePayload }) =>
      penalizeReport(reportId, data),
    onSuccess: (_, variables) => {
      toast.success("신고 처리가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["report-detail", String(variables.reportId)] });
      queryClient.invalidateQueries({ queryKey: ["Reports List"] });
    },
    onError: () => {
      toast.error("신고 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
