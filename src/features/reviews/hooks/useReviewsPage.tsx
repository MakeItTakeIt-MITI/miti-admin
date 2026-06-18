import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReviewsList } from "./query/useReviewsList";

export const useReviewsPage = () => {
  const [reviewType, setReviewType] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const reviewTypeArr = reviewType ? [reviewType] : [];

  const {
    data: reviewsListData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useReviewsList(search, reviewTypeArr);

  const reviewsData = reviewsListData?.pages?.flatMap((page) => page?.data?.items);

  const rows = useMemo(() => {
    if (!reviewsData) return [];
    return reviewsData.filter(Boolean);
  }, [reviewsData]);

  return {
    rows,
    hasNextPage,
    fetchNextPage,
    reviewType,
    setReviewType,
    isLoading,
    isFetchingNextPage,
  };
};
