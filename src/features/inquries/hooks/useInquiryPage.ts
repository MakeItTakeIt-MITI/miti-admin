import { useSearchParams } from "react-router-dom";
import { useInquiriesListHook } from "./query/useInquiriesListHook";

export const useInquiryPage = () => {
  interface Inquiry {
    id: number;
    user: number;
    title: string;
    num_of_answers: number;
    created_at: string;
    modified_at: string;
  }

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const { data, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage } =
    useInquiriesListHook(search);
  const inquiryData = data?.pages?.flatMap((page) => page?.data?.items);

  const rows: Inquiry[] = Array.isArray(inquiryData)
    ? inquiryData
    : Array.isArray(inquiryData)
      ? inquiryData
      : [];

  return { inquiryData, rows, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage };
};
