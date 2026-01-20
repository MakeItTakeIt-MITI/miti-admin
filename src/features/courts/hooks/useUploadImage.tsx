import { useMutation } from "@tanstack/react-query";
import { uploadNcpFile } from "../api/ncp";

export const useUploadImage = (uploadUrl: string, contentType: "image/png") => {
  return useMutation({
    mutationFn: (file: File) => uploadNcpFile(uploadUrl, file, contentType),
  });
};
