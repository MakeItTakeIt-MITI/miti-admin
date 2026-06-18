import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createAdvertisement, CreateAdvertisementPayload } from "../../api/advertisements";

export const useCreateAdvertisement = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdvertisementPayload) => createAdvertisement(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Advertisements List"] });
      toast.success("광고가 등록되었습니다.");
      onSuccess?.();
    },
    onError: (error: any) => {
      console.error("Create advertisement error detail:", error.response?.data);
      const data = error.response?.data;
      let errMsg = "광고 등록에 실패했습니다.";
      if (data) {
        if (typeof data === "object") {
          errMsg = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
            .join(" | ");
        } else if (typeof data === "string") {
          errMsg = data;
        }
      }
      toast.error(`광고 등록 실패: ${errMsg}`);
    },
  });
};
