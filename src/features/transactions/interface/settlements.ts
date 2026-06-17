export type TransferStatus = "waiting" | "completed" | "declined";

export type AccountBank =
  | "KOOKMIN"
  | "SHINHAN"
  | "WOORI"
  | "SHINHYEOP"
  | "IBK"
  | "SAEMAUL"
  | "NONGHYEOP"
  | "SC"
  | "KYONGNAMBANK"
  | "DAEGUBANK"
  | "GWANGJUBANK"
  | "BUSANBANK"
  | "CITI"
  | "SUHYEOP"
  | "KDBBANK"
  | "JEONBUKBANK"
  | "JEJUBANK"
  | "POST"
  | "HANA"
  | "KBANK"
  | "TOSSBANK"
  | "KAKAOBANK"
  | "SANLIM"
  | "KOREA_INVESTMENT_AND_SECURITIES"
  | "KB_SECURITIES"
  | "NH_INVESTMENT_AND_SECURITIES";

export interface SettlementsListItem {
  id: number;
  account: number;
  transfer_status: TransferStatus;
  amount: number;
  account_bank: AccountBank;
  account_holder: string;
  account_number: string;
  created_at: string;
}

export interface PlayerProfile {
  gender: string;
  height: number;
  weight: number;
  position: string;
  role: string;
}

export interface UserDetail {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string;
  signup_method: string;
  phone: string;
  created_at: string;
  profile_image_url: string;
  player_profile: PlayerProfile | null;
}

export interface PersonalAccountDetail {
  id: number;
  account_type: "personal";
  status: "active" | "disabled";
  balance: number;
  point: number;
  user: UserDetail;
}

export interface PersonalTransferDetail {
  id: number;
  transfer_status: TransferStatus;
  amount: number;
  account_bank: AccountBank;
  account_holder: string;
  account_number: string;
  created_at: string;
  account: PersonalAccountDetail;
}

export interface TeamInfo {
  id: number;
  name: string;
  status: string;
}

export interface TeamAccountDetail {
  id: number;
  balance: number;
  status: "active" | "disabled";
  team: TeamInfo;
}

export interface TeamTransferDetail {
  id: number;
  transfer_status: TransferStatus;
  amount: number;
  account_bank: AccountBank;
  account_holder: string;
  account_number: string;
  created_at: string;
  account: TeamAccountDetail;
}

export interface TeamTransferListItem {
  id: number;
  account: number;
  transfer_status: TransferStatus;
  amount: number;
  account_bank: AccountBank;
  account_holder: string;
  account_number: string;
  created_at: string;
}

export interface TransferField {
  transfer_status: TransferStatus;
}
