import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateNotification, UpdateNotificationPayload } from "../../api/notifications";

export const useUpdateNotification = (id: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNotificationPayload) => updateNotification(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Notification Detail", id] });
      queryClient.invalidateQueries({ queryKey: ["Notifications List"] });
      toast.success("공지사항이 수정되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("공지사항 수정에 실패했습니다.");
    },
  });
};
