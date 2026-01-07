import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCourtsDetails } from "../../api/courts";

interface UseEditCourtDetailsProps {
  courtId: number;
}

// Patchable fields
interface CourtPatchPayload {
  name?: string;

  info?: string;
  images?: string[];
}

export const useEditCourtDetails = (courtId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["editCourtDetails", courtId],
    mutationFn: (data: CourtPatchPayload) => {
      if (!courtId) throw new Error("courtId is required");
      return patchCourtsDetails(courtId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courtDetails", courtId] });
      queryClient.invalidateQueries({ queryKey: ["courtsList"] });
    },
  });
};
