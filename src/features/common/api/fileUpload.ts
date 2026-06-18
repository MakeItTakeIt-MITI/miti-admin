import axiosUrl from "../../../utils/axios";
import axios from "axios";

/**
 * presigned URL 발급 요청
 * @param category - FileCategory enum 값 (예: "court_image", "image")
 * @param imageType - 이미지 포맷 키 ("png" | "jpeg" | "webp")
 */
export const getPresignedUrl = async (category: string, imageType: string) => {
  const response = await axiosUrl.get("/file-upload-url", {
    params: { category, [imageType]: 1 },
  });
  return response.data;
};

/**
 * presigned URL을 통해 NCP Object Storage에 파일 업로드
 */
export const uploadFileToStorage = async (
  uploadUrl: string,
  file: File,
  contentType: string,
) => {
  const response = await axios.put(uploadUrl, file, {
    headers: { "Content-Type": contentType },
  });
  return response;
};
