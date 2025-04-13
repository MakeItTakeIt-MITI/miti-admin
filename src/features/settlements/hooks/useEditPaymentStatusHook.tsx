import { useMutation } from "@tanstack/react-query";
import { patchTransferStatus } from "../api/settlements";
import { TransferField } from "../interface/settlements";

const useEditPaymentStatusHook = (requestId: number) => {
  return useMutation({
    mutationFn: (data: TransferField) => patchTransferStatus(requestId, data),
  });
};

export default useEditPaymentStatusHook;
