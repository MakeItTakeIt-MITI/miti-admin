import { useQuery } from "@tanstack/react-query";
import { getFileUploadUrl } from "../../api/courts";

export const useGetFileUrl = () => {
  return useQuery({
    queryKey: ["getFileUploadUrl"],
    queryFn: () => getFileUploadUrl(),
  });
};
