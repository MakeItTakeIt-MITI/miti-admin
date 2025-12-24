import { useMemo } from "react";
import { useCourtsList } from "./query/useCourtsList";

export const useCourtsPage = () => {
  const { data: courtsListData } = useCourtsList("", "");

  // const courtsData = courtsListData?.pages?.flatMap(
  //   (page) => page?.data?.items
  // );

  // const rows = useMemo(() => {
  //   if (!courtsData) return [];
  //   if (Array.isArray(courtsData)) return courtsData;

  //   return courtsData;
  // }, [courtsData]);

  return { courtsListData };
};
