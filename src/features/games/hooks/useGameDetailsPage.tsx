import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGameDetailsDataHook } from "./useGameDetailsDataHook";
import { usePatchGameDetailsHook } from "./usePatchGameDetailsHook";
import { usePatchTeamScheduleHook } from "./usePatchTeamScheduleHook";
import { useTeamScheduleDetailHook } from "./query/useTeamScheduleDetailHook";
import { TeamScheduleDetail } from "../interface/game";

type GameDetailsTab = "gameInfo" | "participants" | "hostReportInfo";
type TeamScheduleTab = "scheduleInfo" | "participants";

const formatTime = (t: string) => (t && t.length === 5 ? `${t}:00` : t);

export const useGameDetailsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showEditContainer, setShowEditContainer] = useState(false);

  // Individual game edit state
  const [minPlayers, setMinPlayers] = useState<number>(0);
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [gameInfo, setGameInfo] = useState("");
  const [hostId, setHostId] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  // Team schedule edit state
  const [teamContent, setTeamContent] = useState("");
  const [teamMaxInvitation, setTeamMaxInvitation] = useState<number>(0);
  const [teamMemberFee, setTeamMemberFee] = useState<number>(0);
  const [teamIsExternalAllowed, setTeamIsExternalAllowed] = useState(false);
  const [teamMinInvitation, setTeamMinInvitation] = useState<number>(0);
  const [teamFee, setTeamFee] = useState<number>(0);
  const [teamInfo, setTeamInfo] = useState("");
  const [teamStartDate, setTeamStartDate] = useState("");
  const [teamStartTime, setTeamStartTime] = useState("");
  const [teamEndDate, setTeamEndDate] = useState("");
  const [teamEndTime, setTeamEndTime] = useState("");

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
  const { data: teamDataRaw } = useTeamScheduleDetailHook(gameType === "team_game" ? gameId : 0);
  const teamData: TeamScheduleDetail | undefined = teamDataRaw?.data ?? teamDataRaw;

  const { mutate: mutateGameDetails } = usePatchGameDetailsHook(gameId, setShowEditContainer);
  const { mutate: mutateTeamSchedule } = usePatchTeamScheduleHook(gameId, setShowEditContainer);

  // Initialize individual game edit state
  useEffect(() => {
    if (!data?.data) return;
    setMinPlayers(data.data.min_invitation ?? 0);
    setMaxPlayers(data.data.max_invitation ?? 0);
    setGameInfo(data.data.info ?? "");
    setHostId(data.data.host?.id ?? 0);
    setStartDate(data.data.startdate ?? "");
    setStartTime(data.data.starttime?.slice(0, 5) ?? "");
    setEndDate(data.data.enddate ?? "");
    setEndTime(data.data.endtime?.slice(0, 5) ?? "");
  }, [data?.data]);

  // Initialize team schedule edit state
  useEffect(() => {
    if (!teamData || teamData.schedule_type !== "game") return;
    setTeamContent(teamData.content ?? "");
    setTeamMaxInvitation(teamData.max_invitation ?? 0);
    setTeamMemberFee(teamData.member_fee ?? 0);
    setTeamIsExternalAllowed(teamData.is_external_allowed ?? false);
    setTeamMinInvitation(teamData.min_invitation ?? 0);
    setTeamFee(teamData.fee ?? 0);
    setTeamInfo(teamData.info ?? "");
    setTeamStartDate(teamData.startdate ?? "");
    setTeamStartTime(teamData.starttime?.slice(0, 5) ?? "");
    setTeamEndDate(teamData.enddate ?? "");
    setTeamEndTime(teamData.endtime?.slice(0, 5) ?? "");
  }, [teamData]);

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
      info: gameInfo || null,
      host: hostId,
      startdate: startDate,
      starttime: formatTime(startTime),
      enddate: endDate,
      endtime: formatTime(endTime),
    });
  };

  const handleSubmitTeamUpdate = () => {
    mutateTeamSchedule({
      content: teamContent,
      max_invitation: teamMaxInvitation,
      member_fee: teamMemberFee,
      is_external_allowed: teamIsExternalAllowed,
      min_invitation: teamMinInvitation,
      fee: teamFee || null,
      info: teamInfo || null,
      startdate: teamStartDate,
      starttime: formatTime(teamStartTime),
      enddate: teamEndDate,
      endtime: formatTime(teamEndTime),
    });
  };

  return {
    gameId,
    gameType,
    tab,
    data,
    teamData,
    showEditContainer,
    // Individual game edit
    minPlayers,
    maxPlayers,
    gameInfo,
    hostId,
    startDate,
    startTime,
    endDate,
    endTime,
    setMinPlayers,
    setMaxPlayers,
    setGameInfo,
    setHostId,
    setStartDate,
    setStartTime,
    setEndDate,
    setEndTime,
    handleSubmitUpdate,
    // Team schedule edit
    teamContent,
    teamMaxInvitation,
    teamMemberFee,
    teamIsExternalAllowed,
    teamMinInvitation,
    teamFee,
    teamInfo,
    teamStartDate,
    teamStartTime,
    teamEndDate,
    teamEndTime,
    setTeamContent,
    setTeamMaxInvitation,
    setTeamMemberFee,
    setTeamIsExternalAllowed,
    setTeamMinInvitation,
    setTeamFee,
    setTeamInfo,
    setTeamStartDate,
    setTeamStartTime,
    setTeamEndDate,
    setTeamEndTime,
    handleSubmitTeamUpdate,
    // Common
    handleDisplayEditContainer,
    handleSetTab,
  };
};
