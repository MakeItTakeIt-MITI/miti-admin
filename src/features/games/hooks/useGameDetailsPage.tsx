import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGameDetailsDataHook } from "./useGameDetailsDataHook";
import { usePatchGameDetailsHook } from "./usePatchGameDetailsHook";

type GameDetailsTab = "gameInfo" | "participants" | "hostReportInfo";

export const useGameDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [minPlayers, setMinPlayers] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [gameInfo, setGameInfo] = useState("");

  const gameId = Number(searchParams.get("gameId"));
  const tabParam = searchParams.get("tab");
  const tab: GameDetailsTab =
    tabParam === "participants" || tabParam === "hostReportInfo" || tabParam === "gameInfo"
      ? tabParam
      : "gameInfo";

  const { data } = useGameDetailsDataHook(gameId);
  const { mutate: mutateGameDetails } = usePatchGameDetailsHook(gameId, setShowEditContainer);

  useEffect(() => {
    if (!data?.data) return;
    setMinPlayers(data.data.min_invitation ?? 0);
    setMaxPlayers(data.data.max_invitation ?? 0);
    setGameInfo(data.data.info ?? "");
  }, [data?.data]);

  const handleDisplayEditContainer = () => {
    setShowEditContainer((prev) => !prev);
  };

  const handleSetTab = (selected: GameDetailsTab) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("tab", selected);
      return params;
    });
  };

  const handleSubmitUpdate = () => {
    mutateGameDetails({
      min_invitation: minPlayers,
      max_invitation: maxPlayers,
      info: gameInfo,
    });
  };

  return {
    gameId,
    tab,
    data,
    showEditContainer,
    minPlayers,
    maxPlayers,
    gameInfo,
    setMinPlayers,
    setMaxPlayers,
    setGameInfo,
    handleDisplayEditContainer,
    handleSetTab,
    handleSubmitUpdate,
  };
};
