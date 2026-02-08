import { useState } from "react";
import axiosUrl from "../../../utils/axios";
import { useQuery } from "@tanstack/react-query";

const useImageUpload = () => {
  const [file, setFile] = useState<FileList[] | null>(null);

  // API to call presigned URL for image upload
  const getFileUploadUrl = async (imageType: string, num_of_files_: number) => {
    try {
      const response = await axiosUrl.get(
        `/file-upload-url?category=court_image&${imageType}=${num_of_files_}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get file upload URL");
    }
  };

  // useQuery Hook to fetch presigned URL
  const useGetFileUrl = (imageType: string, num_of_files_: number) => {
    return useQuery({
      queryKey: ["getFileUploadUrl", imageType, num_of_files_],
      queryFn: () => getFileUploadUrl(imageType, num_of_files_),
    });
  };
};

export default useImageUpload;
