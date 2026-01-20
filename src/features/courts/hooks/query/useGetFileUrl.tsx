import { useQuery } from "@tanstack/react-query";
import { getFileUploadUrl } from "../../api/courts";

export const useGetFileUrl = (imageType: string) => {
  return useQuery({
    queryKey: ["getFileUploadUrl", imageType],
    queryFn: () => getFileUploadUrl(imageType),
  });
};
