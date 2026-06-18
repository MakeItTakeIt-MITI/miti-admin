export type ReviewType = "host_review" | "guest_review";

export interface ReviewUser {
  id: number;
  email: string;
  nickname: string;
  name: string;
  birthday: string | null;
  signup_method: string;
  phone: string;
}

export interface ReviewTarget {
  id: number;
  game_status: string;
  title: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
}

export interface AdminReviewResponse {
  id: number;
  review_type: ReviewType;
  rating: number;
  comment: string;
  tags: string[];
  reviewer: ReviewUser;
  reviewee: ReviewUser | null;
  target: ReviewTarget;
  created_at: string;
}

export interface AdminReviewListCursorResponse {
  items: AdminReviewResponse[];
  page_first_cursor: string | null;
  page_last_cursor: string | null;
  has_more: boolean;
}
