import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGameDetailsDataHook } from "./useGameDetailsDataHook";
import { usePatchGameDetailsHook } from "./usePatchGameDetailsHook";
import { useTeamScheduleDetailHook } from "./query/useTeamScheduleDetailHook";

type GameDetailsTab = "gameInfo" | "participants" | "hostReportInfo";
type TeamScheduleTab = "scheduleInfo" | "participants";

export const useGameDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showEditContainer, setShowEditContainer] = useState(false);
  const [minPlayers, setMinPlayers] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [gameInfo, setGameInfo] = useState("");

  const gameId = Number(searchParams.get("gameId"));
  const gameType = (searchParams.get("type") ?? "game") as "game" | "team_game";
  const tabParam = searchParams.get("tab");

  const tab: GameDetailsTab | TeamScheduleTab =
    gameType === "team_game"
      ? tabParam === "participants"
        ? "participants"
        : "scheduleInfo"
      : tabParam === "participants" || tabParam === "hostReportInfo" || tabParam === "gameInfo"
        ? tabParam
        : "gameInfo";

  // data.data is the actual game object ({ data: gameDetail, status_code })
  const { data } = useGameDetailsDataHook(gameType === "game" ? gameId : 0);
  // teamData is the team schedule object directly
  const { data: teamData } = useTeamScheduleDetailHook(gameType === "team_game" ? gameId : 0);

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

  const handleSetTab = (selected: GameDetailsTab | TeamScheduleTab) => {
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
    gameType,
    tab,
    data,
    teamData,
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
