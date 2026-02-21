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
      alert("성공적으로 신고가 기각되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["Report List", "report-detail", responseData.reportId],
      });
    },
    onError: (error) => {
      alert("기각 실패 " + error);
    },
  });
};
