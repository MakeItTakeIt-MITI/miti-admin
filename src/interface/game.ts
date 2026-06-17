import { Court } from "./court";

export type Game = {
  id: number;
  game_status: string;
  title: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  max_invitation: number;
  min_invitation: number;
  fee: number;
  info: string;
  court: Court;
};
