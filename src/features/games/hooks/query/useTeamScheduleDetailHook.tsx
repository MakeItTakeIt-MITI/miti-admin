import { useQuery } from "@tanstack/react-query";
import { fetchTeamScheduleDetail } from "../../api/games";

export const useTeamScheduleDetailHook = (scheduleId: number) => {
  return useQuery({
    queryKey: ["Team Schedule Detail", scheduleId],
    queryFn: () => fetchTeamScheduleDetail(scheduleId),
    enabled: !!scheduleId,
  });
};
