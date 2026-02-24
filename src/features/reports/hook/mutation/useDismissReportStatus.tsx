import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dismissReportStatus } from "../../api/report_update";
import { toast } from "react-toastify";
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
      toast.success("신고가 기각되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["Report List", "report-detail", responseData.reportId],
      });
    },
    onError: () => {
      toast.error("신고 기각에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
