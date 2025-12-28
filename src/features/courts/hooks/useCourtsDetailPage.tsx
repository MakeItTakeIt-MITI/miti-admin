import { useSearchParams } from "react-router-dom";
import { useCourtsDetails } from "./query/useCourtsDetails";

export const useCourtsDetailPage = () => {
  const [searchParams] = useSearchParams();
  const courtId = Number(searchParams.get("courtId"));

  const { data, isLoading, error } = useCourtsDetails({ courtId });

  const gameDetailsData = data?.data;

  return { gameDetailsData, isLoading, error };
};
