export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  signup_method: string;
  phone: string;
}

export interface HostReportField {
  id: number;
  report_reason: number;
  game: number;
  report_status: string;
  created_at: string;
  reportee: UserInfo;
  reporter: UserInfo;
}
