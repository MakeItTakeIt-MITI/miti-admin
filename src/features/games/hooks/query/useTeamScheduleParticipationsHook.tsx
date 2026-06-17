import { useQuery } from "@tanstack/react-query";
import { fetchTeamScheduleParticipations } from "../../api/games";

export const useTeamScheduleParticipationsHook = (scheduleId: number) => {
  return useQuery({
    queryKey: ["Team Schedule Participations", scheduleId],
    queryFn: () => fetchTeamScheduleParticipations(scheduleId),
    enabled: !!scheduleId,
  });
};
