import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReportStatus } from "../../api/report_update";

interface UpdateReportStatusData {
  result: string;
  penalty: string;
  report_status: string;
  duration: string;
  refund_participation_payment?: boolean;
}

export const useUpdateReportStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      report_type,
      reportId,
      data,
    }: {
      report_type: string | null;
      reportId: number;
      data: UpdateReportStatusData;
    }) => updateReportStatus(report_type, reportId, data),
    onSuccess: (responseData) => {
      queryClient.invalidateQueries({
        queryKey: ["report-details", responseData.reportId],
      });
    },
  });
};
