import { useQuery } from "@tanstack/react-query";
import { fetchInquiryDetails } from "../../api/support";

export const useInquiryDetailsHook = (inquiryId: number) => {
  return useQuery({
    queryKey: ["Inquiry Details", inquiryId],
    queryFn: () => fetchInquiryDetails(inquiryId),
  });
};
