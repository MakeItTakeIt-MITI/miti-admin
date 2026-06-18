import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCouponPolicies } from "../../api/coupons";

export const useCouponPoliciesList = () => {
  return useInfiniteQuery({
    queryKey: ["Coupon Policies List"],
    queryFn: ({ pageParam }) => fetchCouponPolicies(pageParam, 40),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null,
  });
};
