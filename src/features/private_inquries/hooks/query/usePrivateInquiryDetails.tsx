import { useQuery } from "@tanstack/react-query";
import { privateInquiresDetails } from "../../api/private_inquriies";

export const usePrivateDetails = (inquiryId: number) => {
  return useQuery({
    queryKey: ["privateInquiryDetails", inquiryId],
    queryFn: () => privateInquiresDetails(inquiryId),
  });
};
