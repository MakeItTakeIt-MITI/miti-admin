export type AdvertisementStatus = "active" | "expired";

export interface AdvertisementItem {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  data: Record<string, any>;
  thumbnail_image_path: string;
  advertisement_status: AdvertisementStatus;
  created_at: string;
  expire_at: string | null;
}
