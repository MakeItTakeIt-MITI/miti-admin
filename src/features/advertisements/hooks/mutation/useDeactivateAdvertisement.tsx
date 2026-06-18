import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deactivateAdvertisement } from "../../api/advertisements";

export const useDeactivateAdvertisement = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => deactivateAdvertisement(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["Advertisement Detail", id] });
      queryClient.invalidateQueries({ queryKey: ["Advertisements List"] });
      toast.success("광고가 만료(비활성화) 처리되었습니다.");
      onSuccess?.();
      navigate("/popups?tab=advertisement");
    },
    onError: () => {
      toast.error("광고 만료 처리에 실패했습니다.");
    },
  });
};
