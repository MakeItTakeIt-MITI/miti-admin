import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTeamsList } from "./query/useTeamsList";

export const useTeamsPage = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const statusArr = status ? [status] : [];

  const {
    data: teamsListData,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useTeamsList(search, statusArr);

  const teamsData = teamsListData?.pages?.flatMap((page) => page?.data?.items);

  const rows = useMemo(() => {
    if (!teamsData) return [];
    if (Array.isArray(teamsData)) return teamsData;
    return teamsData;
  }, [teamsData]);

  return {
    rows,
    hasNextPage,
    fetchNextPage,
    status,
    setStatus,
    isLoading,
  };
};
