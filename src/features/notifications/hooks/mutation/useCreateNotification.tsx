import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createNotification,
  CreateNotificationPayload,
} from "../../api/notifications";

export const useCreateNotification = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNotificationPayload) => createNotification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Notifications List"] });
      toast.success("공지사항이 등록되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("공지사항 등록에 실패했습니다.");
    },
  });
};
