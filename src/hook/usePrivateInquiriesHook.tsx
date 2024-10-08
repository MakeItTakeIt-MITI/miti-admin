import { useQuery } from "@tanstack/react-query";
import { privateInquiriesData } from "../api/support";

export const usePrivateInquiriesHook = (page: number) => {
  return useQuery({
    queryKey: ["Private Inquiries", page],
    queryFn: () => privateInquiriesData(page),
  });
};
