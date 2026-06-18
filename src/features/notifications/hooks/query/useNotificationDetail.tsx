import { useQuery } from "@tanstack/react-query";
import { fetchNotificationDetail } from "../../api/notifications";
import { NotificationDetail } from "../../interface/notifications";

export const useNotificationDetail = (id: number) => {
  return useQuery<NotificationDetail>({
    queryKey: ["Notification Detail", id],
    queryFn: () => fetchNotificationDetail(id),
    enabled: !!id,
  });
};
