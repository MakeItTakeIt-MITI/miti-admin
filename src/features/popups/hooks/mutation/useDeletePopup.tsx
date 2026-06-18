import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePopup } from "../../api/popups";

export const useDeletePopup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => deletePopup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Popups List"] });
      toast.success("팝업이 삭제되었습니다.");
      navigate("/popups");
    },
    onError: () => {
      toast.error("팝업 삭제에 실패했습니다.");
    },
  });
};
