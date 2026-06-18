export type PopupStatus = "active" | "inactive";

export interface PopupItem {
  id: number;
  title: string;
  subtitle: string | null;
  image: string;
  button_text: string;
  url: string;
  status: PopupStatus;
  valid_until: string | null; // YYYY-MM-DD
  created_at: string;
  modified_at: string;
}

export interface PopupListResponse {
  items: PopupItem[];
  page_first_cursor: string | null;
  page_last_cursor: string | null;
  has_more: boolean;
}
