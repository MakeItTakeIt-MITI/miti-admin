import axiosUrl from "../../../utils/axios";
import { DiscountType, ItemType } from "../interface/coupons";

export const fetchCouponPolicies = async (
  cursor: string | null,
  limit: number,
  params?: { target_item_type?: string[]; discount_type?: string[] },
) => {
  const response = await axiosUrl.get("/admin/coupon-policies", {
    params: { cursor, limit, ...params },
  });
  return response.data;
};

export const fetchCoupons = async (
  cursor: string | null,
  limit: number,
  params?: { status?: string[] },
) => {
  const response = await axiosUrl.get("/admin/coupons", {
    params: { cursor, limit, ...params },
  });
  return response.data;
};

export interface CreateCouponPolicyPayload {
  name: string;
  target_item_type: ItemType;
  discount_type: DiscountType;
  discount_value: number;
  max_discount_amount?: number;
}

export const createCouponPolicy = async (payload: CreateCouponPolicyPayload) => {
  const response = await axiosUrl.post("/admin/coupon-policies", payload);
  return response.data;
};

export interface CreateCouponPayload {
  policy: number;
  user?: number;
  valid_from?: string;
  valid_until?: string;
}

export const createCoupon = async (payload: CreateCouponPayload) => {
  const response = await axiosUrl.post("/admin/coupons", payload);
  return response.data;
};
