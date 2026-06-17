import { useQuery } from "@tanstack/react-query";
import { getCourtsDetails } from "../../api/courts";

interface UseCourtsDetailsProps {
  courtId: null | number;
}

export const useCourtsDetails = ({ courtId }: UseCourtsDetailsProps) => {
  return useQuery({
    queryKey: ["courtDetails", courtId],
    queryFn: () => getCourtsDetails(courtId),
  });
};
