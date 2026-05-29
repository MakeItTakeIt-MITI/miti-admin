import { useQuery } from "@tanstack/react-query";
import { fetchTeamTransferRequestDetails } from "../../api/settlements";

export const useTeamTransferRequestDetails = (requestId: number | null) => {
  return useQuery({
    queryKey: ["Team Transfer Request Details", requestId],
    queryFn: () => fetchTeamTransferRequestDetails(requestId),
    enabled: requestId !== null,
  });
};
