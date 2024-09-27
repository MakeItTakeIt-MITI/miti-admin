import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentStatusChange } from "../api/payments";

export const usePaymentStatusHook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      transferId,
      data,
    }: {
      transferId: number | null;
      data: { transfer_status: string };
    }) => paymentStatusChange(transferId, data),

    onSuccess: () => {
      //   queryClient.invalidateQueries("Users");
      queryClient.invalidateQueries({ queryKey: ["Payment Details"] });
      queryClient.invalidateQueries({ queryKey: ["Payments List"] });
    },
  });
};
