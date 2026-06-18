import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCouponPolicy, CreateCouponPolicyPayload } from "../../api/coupons";

export const useCreateCouponPolicy = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCouponPolicyPayload) => createCouponPolicy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Coupon Policies List"] });
      toast.success("쿠폰 정책이 등록되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("쿠폰 정책 등록에 실패했습니다.");
    },
  });
};
