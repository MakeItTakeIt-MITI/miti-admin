import { useQuery } from "@tanstack/react-query";
import { privateInquiryDetails } from "../api/support";

export const usePrivateInquiryDetaisHook = (inquiryId: number | null) => {
  return useQuery({
    queryKey: ["Inquiry Details", inquiryId],
    queryFn: () => privateInquiryDetails(inquiryId),
  });
};
