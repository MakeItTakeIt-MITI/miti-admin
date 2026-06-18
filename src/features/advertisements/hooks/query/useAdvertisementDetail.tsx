import { useQuery } from "@tanstack/react-query";
import { fetchAdvertisementDetail } from "../../api/advertisements";

export const useAdvertisementDetail = (id: number) => {
  return useQuery({
    queryKey: ["Advertisement Detail", id],
    queryFn: () => fetchAdvertisementDetail(id),
    enabled: !!id && !isNaN(id),
  });
};
