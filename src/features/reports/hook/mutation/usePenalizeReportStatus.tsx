import { useMutation, useQueryClient } from "@tanstack/react-query";
import { penalizerReportStatus } from "../../api/report_update";

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
      alert("성공적으로 신고가 처리되었습니다.");
    },
    onError: (error) => {
      alert("신고 처리 실패: " + error);
    },
  });
};
