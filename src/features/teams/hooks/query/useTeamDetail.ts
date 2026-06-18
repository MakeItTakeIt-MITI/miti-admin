import { useQuery } from "@tanstack/react-query";
import { getTeamDetail } from "../../api/teams";
import { TeamDetailResponse } from "../../../../interface/team";

export const useTeamDetail = (teamId: number | null) => {
  return useQuery<TeamDetailResponse>({
    queryKey: ["teamDetail", teamId],
    queryFn: async () => {
      const res = await getTeamDetail(teamId!);
      return res.data;
    },
    enabled: teamId !== null && !isNaN(teamId),
  });
};
