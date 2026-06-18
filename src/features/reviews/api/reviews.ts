import axiosUrl from "../../../utils/axios";
import { AdminReviewListCursorResponse, AdminReviewResponse } from "../interface/reviews";

interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

export const getReviewsList = async (
  cursor: string | null,
  limit: number,
  searchKey: string | null,
  reviewType: string[],
): Promise<ApiResponse<AdminReviewListCursorResponse>> => {
  try {
    const response = await axiosUrl.get("/admin/reviews", {
      params: {
        cursor: cursor ?? undefined,
        limit,
        search_key: searchKey || undefined,
        review_type: reviewType.length > 0 ? reviewType : undefined,
      },
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value == null) return;
          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, String(v)));
          } else {
            searchParams.set(key, String(value));
          }
        });
        return searchParams.toString();
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch reviews list");
  }
};

export const getReviewDetail = async (
  reviewId: number,
): Promise<ApiResponse<AdminReviewResponse>> => {
  try {
    const response = await axiosUrl.get(`/admin/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch review detail");
  }
};
