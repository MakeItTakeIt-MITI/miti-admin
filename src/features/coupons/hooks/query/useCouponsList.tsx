import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchCoupons } from "../../api/coupons";
import { CouponStatus } from "../../interface/coupons";

export const useCouponsList = () => {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const status = statusParam ? (statusParam.split(",") as CouponStatus[]) : undefined;

  return useInfiniteQuery({
    queryKey: ["Coupons List", status],
    queryFn: ({ pageParam }) => fetchCoupons(pageParam, 40, { status }),
    getNextPageParam: (lastPage) => {
      const data = lastPage?.data;
      if (!data) return undefined;
      return data.has_more ? data.page_last_cursor : undefined;
    },
    initialPageParam: null,
  });
};
