export interface NotificationItem {
  id: number;
  title: string;
  created_at: string;
}

export interface NotificationsListResponse {
  items: NotificationItem[];
  page_first_cursor: string;
  page_last_cursor: string;
  has_more: boolean;
}

export interface NotificationDetail {
  id: number;
  title: string;
  content: string | null;
  data: Record<string, unknown> | null;
  created_at: string;
  modified_at: string;
}
