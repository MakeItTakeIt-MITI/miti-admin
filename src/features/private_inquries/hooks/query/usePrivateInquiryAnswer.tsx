import { useQuery } from "@tanstack/react-query";
import { privateInquiresDetailAnswer } from "../../api/private_inquriies";

export const usePrivateInquiryAnswer = (inquiryId: number) => {
  return useQuery({
    queryKey: ["privateInquiryAnswer", inquiryId],
    queryFn: () => privateInquiresDetailAnswer(inquiryId),
  });
};
