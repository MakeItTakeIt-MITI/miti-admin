import axiosUrl from "../../../utils/axios";
import { PopupStatus } from "../interface/popups";

/**
 * 어드민 팝업 목록 조회 (커서 기반 페이지네이션)
 */
export const fetchPopups = async (
  cursor: string | null,
  limit: number,
  params?: { status?: PopupStatus[] }
) => {
  const response = await axiosUrl.get("/admin/popups", {
    params: {
      cursor,
      limit,
      ...params,
    },
  });
  return response.data;
};

/**
 * 어드민 팝업 상세 조회
 */
export const fetchPopupDetail = async (id: number) => {
  const response = await axiosUrl.get(`/admin/popups/${id}`);
  return response.data.data;
};

export interface CreatePopupPayload {
  title: string;
  subtitle?: string | null;
  image: string;
  button_text: string;
  url: string;
  status?: PopupStatus;
  valid_until?: string | null;
}

/**
 * 어드민 팝업 등록
 */
export const createPopup = async (payload: CreatePopupPayload) => {
  const response = await axiosUrl.post("/admin/popups", payload);
  return response.data;
};

export interface UpdatePopupPayload {
  title?: string;
  subtitle?: string | null;
  image?: string;
  button_text?: string;
  url?: string;
  status?: PopupStatus;
  valid_until?: string | null;
}

/**
 * 어드민 팝업 수정
 */
export const updatePopup = async (id: number, payload: UpdatePopupPayload) => {
  const response = await axiosUrl.patch(`/admin/popups/${id}`, payload);
  return response.data;
};

/**
 * 어드민 팝업 삭제
 */
export const deletePopup = async (id: number) => {
  await axiosUrl.delete(`/admin/popups/${id}`);
};
