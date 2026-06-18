export type CouponStatus = "pending" | "active" | "reserved" | "used" | "disabled" | "expired";
export type DiscountType = "fixed" | "percent";
export type ItemType = "participation_fee" | "team_schedule_fee" | "guest_fee";

export interface CouponPolicy {
  id: number;
  name: string;
  target_item_type: ItemType;
  discount_type: DiscountType;
  discount_value: number;
  max_discount_amount: number;
}

export interface Coupon {
  id: number;
  policy: number;
  status: CouponStatus;
  issued_at: string;
  valid_from: string;
  valid_until: string;
  user: number | null;
  code: string;
}

export interface CursorPage<T> {
  items: T[];
  page_first_cursor: string;
  page_last_cursor: string;
  has_more: boolean;
}
