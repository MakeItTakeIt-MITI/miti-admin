import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTeamScheduleDetails } from "../api/games";
import { TeamScheduleEditField } from "../interface/game";
import { toast } from "react-toastify";

export const usePatchTeamScheduleHook = (
  scheduleId: number,
  setShowEditContainer: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TeamScheduleEditField) => patchTeamScheduleDetails(scheduleId, data),

    onSuccess: (res) => {
      const statusCode = res?.status_code;
      if (statusCode === 200) {
        toast.success("일정 정보가 성공적으로 업데이트되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["Team Schedule Detail", scheduleId] });
        setShowEditContainer(false);
      } else {
        toast.error("입력 값을 확인해주세요.");
        setShowEditContainer(true);
      }
    },
    onError: () => {
      toast.error("일정 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
      setShowEditContainer(true);
    },
  });
};
