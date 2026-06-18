import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPopup, CreatePopupPayload } from "../../api/popups";

export const useCreatePopup = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePopupPayload) => createPopup(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Popups List"] });
      toast.success("팝업이 등록되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("팝업 등록에 실패했습니다.");
    },
  });
};
