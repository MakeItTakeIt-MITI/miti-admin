import { useMutation } from "@tanstack/react-query";
import { patchTransferStatus } from "../../api/settlements";
import { TransferField } from "../../interface/settlements";

const useEditTransferStatus = (requestId: number | null) => {
  return useMutation({
    mutationFn: (data: TransferField) => patchTransferStatus(requestId, data),
  });
};

export default useEditTransferStatus;
