import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadNcpFile } from "../api/ncp";

export const useUploadImage = (
  uploadUrl: string,
  contentType: "image/png" | "image/jpeg" | "image/jpg" | "image/webp"
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadNcpFile(uploadUrl, file, contentType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courtDetails"] });
    },
  });
};
