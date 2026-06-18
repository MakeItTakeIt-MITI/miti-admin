import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteNotification } from "../../api/notifications";

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Notifications List"] });
      toast.success("공지사항이 삭제되었습니다.");
      navigate("/notifications?search=");
    },
    onError: () => {
      toast.error("공지사항 삭제에 실패했습니다.");
    },
  });
};
