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
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({
        queryKey: ["report-details", responseData.reportId],
      });
    },
  });
};
