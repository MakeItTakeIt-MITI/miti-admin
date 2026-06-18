import { useQuery } from "@tanstack/react-query";
import { fetchPopupDetail } from "../../api/popups";
import { PopupItem } from "../../interface/popups";

export const usePopupDetail = (id: number) => {
  return useQuery<PopupItem>({
    queryKey: ["Popup Detail", id],
    queryFn: () => fetchPopupDetail(id),
    enabled: !!id,
  });
};
