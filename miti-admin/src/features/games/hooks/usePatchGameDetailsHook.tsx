import { useMutation } from "@tanstack/react-query";
import { patchGameDetails } from "../api/games";
import { GameEditField } from "../interface/game";

export const usePatchGameDetailsHook = (gameId: number) => {
  return useMutation({
    mutationFn: (gameDetails: GameEditField) =>
      patchGameDetails(gameId, gameDetails),
  });
};
