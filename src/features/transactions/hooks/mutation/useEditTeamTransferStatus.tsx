import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { patchTeamTransferStatus } from "../../api/settlements";
import { TransferField } from "../../interface/settlements";

const useEditTeamTransferStatus = (requestId: number | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TransferField) => patchTeamTransferStatus(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Team Transfer Request List"] });
      queryClient.invalidateQueries({ queryKey: ["Team Transfer Request Details", requestId] });
      toast.success("팀 이체 상태가 변경되었습니다.");
    },
    onError: () => {
      toast.error("팀 이체 상태 변경에 실패했습니다.");
    },
  });
};

export default useEditTeamTransferStatus;
