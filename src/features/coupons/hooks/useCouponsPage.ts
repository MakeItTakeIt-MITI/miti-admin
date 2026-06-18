import { useMemo } from "react";
import { useCouponsList } from "./query/useCouponsList";

export const useCouponsPage = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useCouponsList();

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page?.data?.items ?? []) ?? [],
    [data],
  );

  return { rows, hasNextPage, fetchNextPage, isFetching };
};
