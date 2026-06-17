import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { patchTransferStatus } from "../../api/settlements";
import { TransferField } from "../../interface/settlements";

const useEditTransferStatus = (requestId: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TransferField) => patchTransferStatus(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Transfer Request List"] });
      queryClient.invalidateQueries({ queryKey: ["Transfer Request Details", requestId] });
      toast.success("이체 상태가 변경되었습니다.");
    },
    onError: () => {
      toast.error("이체 상태 변경에 실패했습니다.");
    },
  });
};

export default useEditTransferStatus;
