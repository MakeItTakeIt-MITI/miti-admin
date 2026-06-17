import axiosUrl from "../../../utils/axios";
import { GameEditField } from "../interface/game";

export const gamesListData = async (
  cursor: number | null,
  limit: number,
  search: string | null,
  game_status: string | null,
) => {
  try {
    const response = await axiosUrl.get("/admin/games", {
      params: { cursor, limit, search, game_status },
    });
    return response.data;
  } catch {
    throw new Error();
  }
};

export const fetchMatchList = async (
  cursor: string | null,
  limit: number,
  search: string | null,
  status: string[],
  province: string[],
) => {
  try {
    const response = await axiosUrl.get("/admin/matches", {
      params: { cursor, limit, search, status, province },
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value == null) return;
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else {
            searchParams.set(key, String(value));
          }
        });
        return searchParams.toString();
      },
    });
    return response.data;
  } catch {
    throw new Error();
  }
};

export const fetchTeamScheduleDetail = async (scheduleId: number) => {
  try {
    const response = await axiosUrl.get(`/admin/team-schedules/${scheduleId}`);
    return response.data;
  } catch {
    throw new Error();
  }
};

export const fetchTeamScheduleParticipations = async (scheduleId: number) => {
  try {
    const response = await axiosUrl.get(`/admin/team-schedules/${scheduleId}/participations`);
    return response.data;
  } catch {
    throw new Error();
  }
};

export const gameDetailsData = async (gameId: number | null) => {
  try {
    const response = await axiosUrl.get(`/admin/games/${gameId}`);
    return response.data;
  } catch {
    throw new Error();
  }
};

export const fetchGameParticipants = async (game_id: number) => {
  try {
    const response = await axiosUrl(`/admin/games/${game_id}/participations`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchHostReportInfo = async (gameId: number) => {
  try {
    const response = await axiosUrl.get(`/admin/games/${gameId}/host-reports`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const patchGameDetails = async (gameId: number, gameDetails: GameEditField) => {
  try {
    const response = await axiosUrl.patch(`/admin/games/${gameId}`, gameDetails);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
