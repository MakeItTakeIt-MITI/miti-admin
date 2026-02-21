import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dismissReportStatus } from "../../api/report_update";
interface DismissReportStatusData {
  result: string;
  report_status: string;
  content: string;
}
type ReportType = "reports" | "host-reports" | "guest-reports" | "post-reports";

export const useDismissReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      report_type,
      reportId,
      data,
    }: {
      report_type: ReportType;
      reportId: number;
      data: DismissReportStatusData;
    }) => dismissReportStatus(report_type, reportId, data),
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({
        queryKey: ["Report List", "report-detail", responseData.reportId],
      });
    },
  });
};
