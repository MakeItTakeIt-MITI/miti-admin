import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateAdvertisement, UpdateAdvertisementPayload } from "../../api/advertisements";

export const useUpdateAdvertisement = (id: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAdvertisementPayload) => updateAdvertisement(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Advertisement Detail", id] });
      queryClient.invalidateQueries({ queryKey: ["Advertisements List"] });
      toast.success("광고가 수정되었습니다.");
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Update advertisement error detail:", error.response?.data);
      const data = error.response?.data;
      let errMsg = "광고 수정에 실패했습니다.";
      if (data) {
        if (typeof data === "object") {
          errMsg = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
            .join(" | ");
        } else if (typeof data === "string") {
          errMsg = data;
        }
      }
      toast.error(`광고 수정 실패: ${errMsg}`);
    },
  });
};
