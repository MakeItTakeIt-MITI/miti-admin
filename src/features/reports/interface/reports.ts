export interface ReportUser {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  signup_method: string;
  phone: string;
}

export type ReportStatus =
  | "waiting"
  | "evidence_requested"
  | "investigation_in_progress"
  | "concluded";

export type ReportType =
  | "host_report"
  | "guest_report"
  | "post_report"
  | "team_schedule_host_report"
  | "user_report";

export interface ReportsField {
  id: number;
  status: ReportStatus;
  report_reason: string;
  report_type: ReportType;
  content: string;
  reportee: ReportUser;
  reporter: ReportUser;
  created_at: string;
}

// 상세 조회 전용 — report_type에 따라 추가 필드
export interface GameInfo {
  id: number;
  game_status: string;
  title: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  min_invitation: number;
  max_invitation: number;
  num_of_participations: number;
  fee: number;
  created_at: string;
}

export interface ParticipationInfo {
  id: number;
  participation_status: string;
  user: ReportUser & {
    player_profile?: {
      positions: string[];
      level: string;
      height: number;
      weight: number;
    };
  };
  game: GameInfo;
}

export interface PostInfo {
  id: number;
  category: string;
  title: string;
  writer: ReportUser;
  content: string;
  images: string[];
}

export interface TeamScheduleInfo {
  id: number;
  schedule_type: string;
  status: string;
  title: string;
  content: string;
  startdate: string;
  starttime: string;
  max_invitation: number;
  created_at: string;
  team: { id: number; name: string; status: string; level: string };
  host: ReportUser;
  enddate?: string;
  endtime?: string;
  fee?: number;
  member_fee?: number;
  is_external_allowed?: boolean;
  court?: { id: number; name: string; address: string };
  place_name?: string;
  place_address?: string;
}

export interface ReportDetail extends ReportsField {
  game?: GameInfo;
  participation?: ParticipationInfo;
  post?: PostInfo;
  team_schedule?: TeamScheduleInfo;
}
