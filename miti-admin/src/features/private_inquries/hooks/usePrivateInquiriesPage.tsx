import { useSearchParams } from "react-router-dom";
import { usePrivateInquiries } from "./query/usePrivateInquiries";

export const usePrivateInquiriesPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const {
    data,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isLoading,
  } = usePrivateInquiries(search);

  const inquriesListData = data?.pages?.flatMap((page) => page?.data?.items);

  return {
    rows: inquriesListData,
    hasNextPage,
    fetchNextPage,
    hasPreviousPage,
    fetchPreviousPage,
    isLoading,
  };
};
