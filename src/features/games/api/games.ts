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
