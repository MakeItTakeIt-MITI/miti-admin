import { useMemo } from "react";
import { useCouponPoliciesList } from "./query/useCouponPoliciesList";

export const useCouponPoliciesPage = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } = useCouponPoliciesList();

  const rows = useMemo(
    () => data?.pages.flatMap((page) => page?.data?.items ?? []) ?? [],
    [data],
  );

  return { rows, hasNextPage, fetchNextPage, isFetching };
};
