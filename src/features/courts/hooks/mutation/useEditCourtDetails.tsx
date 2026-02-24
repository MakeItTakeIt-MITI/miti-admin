import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCourtsDetails } from "../../api/courts";
import { toast } from "react-toastify";

interface CourtPatchPayload {
  name?: string;
  info?: string;
  images?: string[];
}

export const useEditCourtDetails = (courtId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editCourtDetails", courtId],
    mutationFn: (data: CourtPatchPayload) => {
      if (!courtId) throw new Error("courtId is required");
      return patchCourtsDetails(courtId, data);
    },
    onSuccess: (res) => {
      console.log("success", res);
      toast.success("경기장 정보가 성공적으로 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["courtDetails", courtId] });
      queryClient.invalidateQueries({ queryKey: ["courtsList"] });
    },
    onError: (res) => {
      console.log("error", res);
      toast.error("경기장 정보 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
};
