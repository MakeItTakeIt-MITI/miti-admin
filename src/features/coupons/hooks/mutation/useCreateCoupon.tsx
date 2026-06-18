import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCoupon, CreateCouponPayload } from "../../api/coupons";

export const useCreateCoupon = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCouponPayload) => createCoupon(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Coupons List"] });
      toast.success("쿠폰이 발급되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("쿠폰 발급에 실패했습니다.");
    },
  });
};
