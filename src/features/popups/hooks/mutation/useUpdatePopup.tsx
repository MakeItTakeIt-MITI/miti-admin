import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updatePopup, UpdatePopupPayload } from "../../api/popups";

export const useUpdatePopup = (id: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePopupPayload) => updatePopup(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Popup Detail", id] });
      queryClient.invalidateQueries({ queryKey: ["Popups List"] });
      toast.success("팝업이 수정되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("팝업 수정에 실패했습니다.");
    },
  });
};
