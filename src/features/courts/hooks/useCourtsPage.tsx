import { useMemo, useState } from "react";
import { useCourtsList } from "./query/useCourtsList";
import { useSearchParams } from "react-router-dom";

export const useCourtsPage = () => {
  const PROVINCE_LIST = [
    "서울",
    "경기",
    "인천",
    "부산",
    "대구",
    "광주",
    "대전",
    "울산",
    "세종",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  const [province, setProvince] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // Fetch Courts List Data}
  const {
    data: courtsListData,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useCourtsList(search, province);

  const courtsData = courtsListData?.pages?.flatMap((page) => page?.data?.items);

  const rows = useMemo(() => {
    if (!courtsData) return [];
    if (Array.isArray(courtsData)) return courtsData;

    return courtsData;
  }, [courtsData]);

  return {
    rows,
    hasNextPage,
    fetchNextPage,
    setProvince,
    PROVINCE_LIST,
    province,
    isLoading,
  };
};
