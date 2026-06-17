import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchGameDetails } from "../api/games";
import { GameEditField } from "../interface/game";
import { toast } from "react-toastify";

export const usePatchGameDetailsHook = (
  gameId: number,
  setShowEditContainer: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gameDetails: GameEditField) => patchGameDetails(gameId, gameDetails),

    onSuccess: (res) => {
      const statusCode = res?.status_code;
      if (statusCode === 200) {
        toast.success("경기 정보가 성공적으로 업데이트되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["Game Details", gameId] });
        setShowEditContainer(false);
      } else {
        toast.error("입력 값을 확인해주세요.");
        setShowEditContainer(true);
      }
    },
    onError: () => {
      toast.error("경기 정보 업데이트에 실패했습니다. 다시 시도해주세요.");
      setShowEditContainer(true);
    },
  });
};
