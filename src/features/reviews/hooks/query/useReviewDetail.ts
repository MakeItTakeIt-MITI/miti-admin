import { useQuery } from "@tanstack/react-query";
import { getReviewDetail } from "../../api/reviews";
import { AdminReviewResponse } from "../../interface/reviews";

export const useReviewDetail = (reviewId: number | null) => {
  return useQuery<AdminReviewResponse>({
    queryKey: ["reviewDetail", reviewId],
    queryFn: async () => {
      const res = await getReviewDetail(reviewId!);
      return res.data;
    },
    enabled: reviewId !== null && !isNaN(reviewId),
  });
};
