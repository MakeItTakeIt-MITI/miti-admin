import axiosUrl from "../../../utils/axios";
import { AdvertisementStatus } from "../interface/advertisements";

/**
 * 어드민 광고 목록 조회 (커서 기반 페이지네이션)
 */
export const fetchAdvertisements = async (
  cursor: string | null,
  limit: number,
  params?: { status?: AdvertisementStatus[] },
) => {
  const response = await axiosUrl.get("/admin/advertisements", {
    params: {
      cursor,
      limit,
      ...params,
    },
  });
  return response.data;
};

/**
 * 어드민 광고 상세 조회
 */
export const fetchAdvertisementDetail = async (id: number) => {
  const response = await axiosUrl.get(`/admin/advertisements/${id}`);
  return response.data.data;
};

export interface CreateAdvertisementPayload {
  title: string;
  subtitle?: string | null;
  content: string;
  data?: Record<string, any>;
  thumbnail_image_path: string;
  advertisement_status?: AdvertisementStatus;
  expire_at?: string | null;
}

/**
 * 어드민 광고 등록
 */
export const createAdvertisement = async (payload: CreateAdvertisementPayload) => {
  const response = await axiosUrl.post("/admin/advertisements", payload);
  return response.data;
};

export interface UpdateAdvertisementPayload {
  title?: string;
  subtitle?: string | null;
  content?: string;
  data?: Record<string, any>;
  thumbnail_image_path?: string;
  advertisement_status?: AdvertisementStatus;
  expire_at?: string | null;
}

/**
 * 어드민 광고 수정
 */
export const updateAdvertisement = async (id: number, payload: UpdateAdvertisementPayload) => {
  const response = await axiosUrl.patch(`/admin/advertisements/${id}`, payload);
  return response.data;
};

/**
 * 어드민 광고 비활성화
 */
export const deactivateAdvertisement = async (id: number) => {
  await axiosUrl.delete(`/admin/advertisements/${id}`);
};
