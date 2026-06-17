import { useMutation, useQueryClient } from "@tanstack/react-query";
import { penalizerReportStatus } from "../../api/report_update";
import { toast } from "react-toastify";

interface PenalizeReportStatusData {
  result: string;
  penalty: string;
  report_status: string;
  duration: string;
  content: string;
  refund_participation_payment?: boolean;
}

type ReportType = "reports" | "host-reports" | "guest-reports" | "post-reports";

export const usePenalizeReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      report_type,
      reportId,
      data,
    }: {
      report_type: ReportType;
      reportId: number;
      data: PenalizeReportStatusData;
    }) => penalizerReportStatus(report_type, reportId, data),
    onSuccess: (variables) => {
      queryClient.invalidateQueries({
        queryKey: ["Report List", "report-detail", variables.reportId],
      });
      toast.success("신고 처리가 완료되었습니다.");
    },
    onError: () => {
      toast.error("신고 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
