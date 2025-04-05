import { useQuery } from "@tanstack/react-query";
import { fetchInquiryList } from "../api/support";

export const useInquiriesListHook = (page: number) => {
  return useQuery({
    queryKey: ["User Inquiries List", `Page: ${page}`],
    queryFn: () => fetchInquiryList(page),
  });
};
