export interface PlayerProfile {
  gender: string | null;
  height: number | null;
  weight: number | null;
  position: string | null;
  role: string | null;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  signup_method: string;
  phone: string;
  player_profile: PlayerProfile;
}

export interface ParticipationStatus {
  id: number;
  participation_status: string;
  user: User;
}

export interface GameField {
  id: number;
  title: string;
  game_status: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
}

export interface GameEditField {
  min_invitation?: number;
  max_invitation?: number;
  info?: string | null;
  host?: number;
  startdate?: string;
  starttime?: string;
  enddate?: string;
  endtime?: string;
}

export interface TeamScheduleEditField {
  content?: string;
  max_invitation?: number;
  member_fee?: number;
  is_external_allowed?: boolean;
  min_invitation?: number;
  fee?: number | null;
  info?: string | null;
  startdate?: string;
  starttime?: string;
  enddate?: string;
  endtime?: string;
}

export interface MatchListItem {
  id: number;
  source_id: number;
  game_type: "game" | "team_game";
  status: "open" | "closed" | "completed" | "canceled";
  title: string;
  startdate: string;
  starttime: string;
  enddate: string | null;
  endtime: string | null;
  min_invitation: number;
  max_invitation: number;
  num_of_participations: number;
  fee: number | null;
  court: number;
  court_name: string;
  court_address: string;
  court_images: string[];
  latitude: string;
  longitude: string;
}

export interface TeamScheduleParticipation {
  id: number;
  status: "requested" | "confirmed" | "canceled" | "withdrawn";
  is_external: boolean;
  is_settled: boolean;
  user: User;
  created_at: string;
  modified_at: string;
}

export interface TeamScheduleDetail {
  id: number;
  schedule_type: "game" | "event";
  status: string;
  title: string;
  external_title?: string;
  content: string;
  startdate: string;
  starttime: string;
  enddate?: string;
  endtime?: string;
  min_invitation?: number;
  max_invitation: number | null;
  is_external_allowed?: boolean;
  auto_recruitment?: boolean;
  member_fee: number;
  fee?: number | null;
  info?: string | null;
  place_name?: string;
  place_address?: string;
  latitude?: string;
  longitude?: string;
  created_at: string;
  modified_at: string;
  team: { id: number; name: string; status: string; level: string };
  host: User | null;
  court?: { id: number; name: string; address: string; latitude: string; longitude: string };
  participations: TeamScheduleParticipation[];
}
