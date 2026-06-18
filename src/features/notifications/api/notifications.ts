import axiosUrl from "../../../utils/axios";

export const fetchNotifications = async (cursor: string | null, search?: string) => {
  const response = await axiosUrl.get("/admin/notifications", {
    params: { cursor, search: search || undefined },
  });
  return response.data;
};

export interface CreateNotificationPayload {
  title: string;
  content?: string;
  data?: Record<string, unknown>;
}

export const createNotification = async (payload: CreateNotificationPayload) => {
  const response = await axiosUrl.post("/admin/notifications", payload);
  return response.data;
};

export const fetchNotificationDetail = async (id: number) => {
  const response = await axiosUrl.get(`/admin/notifications/${id}`);
  return response.data.data;
};

export interface UpdateNotificationPayload {
  title?: string;
  content?: string;
  data?: Record<string, unknown>;
}

export const updateNotification = async (id: number, payload: UpdateNotificationPayload) => {
  const response = await axiosUrl.patch(`/admin/notifications/${id}`, payload);
  return response.data;
};

export const deleteNotification = async (id: number) => {
  await axiosUrl.delete(`/admin/notifications/${id}`);
};
