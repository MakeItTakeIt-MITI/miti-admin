export type TeamStatus = "created" | "active" | "suspended" | "inactive" | "deleted";
export type TeamLevel = "rookie" | "division6" | "division5" | "division4" | "division3" | "elite";

export interface TeamMeta {
  id: number;
  name: string;
  status: TeamStatus;
  level: TeamLevel;
  introduction: string | null;
  city_id: number;
  city_name: string;
  latitude: string;
  longitude: string;
  num_of_members: number;
  image: string | null;
}

export interface TeamCity {
  id: number;
  code: string;
  name: string;
  latitude: string;
  longitude: string;
}

export interface TeamOwner {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string | null;
  signup_method: string;
  phone: string;
}

export interface TeamPlan {
  id: number;
  name: string;
  max_members: number;
  max_mangers: number;
}

export interface TeamMembershipUser {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string | null;
  signup_method: string;
  phone: string;
  player_profile: {
    position: string;
    height: number;
    weight: number;
  } | null;
}

export interface TeamMembership {
  id: number;
  role: "owner" | "manager" | "member";
  status: "pending" | "active" | "inactive" | "suspended" | "banned" | "withdrawn";
  created_at: string;
  user: TeamMembershipUser;
}

export interface TeamDetailResponse {
  id: number;
  name: string;
  status: TeamStatus;
  level: TeamLevel;
  introduction: string | null;
  images: string[];
  created_at: string;
  city: TeamCity;
  owner: TeamOwner;
  plan: TeamPlan | null;
  memberships: TeamMembership[];
}

