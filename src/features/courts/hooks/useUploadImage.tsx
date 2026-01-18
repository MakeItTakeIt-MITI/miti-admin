import { useMutation } from "@tanstack/react-query";
import { uploadNcpFile } from "../api/ncp";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({
      uploadUrl,
      file,
      contentType,
    }: {
      uploadUrl: string;
      file: string | null;
      contentType: string;
    }) => uploadNcpFile(uploadUrl, file, contentType),
  });
};
