import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { getPresignedUrl, uploadFileToStorage } from "../api/fileUpload";
import { isValidImageFile, getImageFormatKey } from "../utils/imageValidator";

interface UseImageUploadOptions {
  category: string; // "image", "court_image" 등
  onSuccess?: (fileUrl: string) => void;
}

interface UseImageUploadReturn {
  selectedFile: File | null;
  previewUrl: string | null;
  fileUrl: string | null; // 업로드 완료 후 서버에서 받은 file_url
  isUploading: boolean;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<void>;
  clearFile: () => void;
}

export const useImageUpload = ({
  category,
  onSuccess,
}: UseImageUploadOptions): UseImageUploadReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 파일 타입 검증
      if (!isValidImageFile(file)) {
        toast.error("지원하지 않는 이미지 형식입니다. (PNG, JPEG, WEBP만 허용)");
        e.target.value = "";
        return;
      }

      // 이전 프리뷰 URL 해제
      if (previewUrl) URL.revokeObjectURL(previewUrl);

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileUrl(null); // 새 파일 선택 시 이전 업로드 결과 초기화
    },
    [previewUrl],
  );

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      toast.error("업로드할 파일을 먼저 선택해주세요.");
      return;
    }

    setIsUploading(true);
    try {
      // 1. presigned URL 발급
      const formatKey = getImageFormatKey(selectedFile);
      const urlResponse = await getPresignedUrl(category, formatKey);
      const urlData = urlResponse.data[formatKey]?.[0];

      if (!urlData) {
        throw new Error("presigned URL 발급 실패");
      }

      const { upload_url, file_url, content_type } = urlData;

      // 2. NCP 스토리지에 파일 업로드
      const uploadResult = await uploadFileToStorage(upload_url, selectedFile, content_type);

      if (uploadResult.status === 200) {
        setFileUrl(file_url);
        toast.success("이미지가 업로드되었습니다.");
        onSuccess?.(file_url);
      }
    } catch {
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, category, onSuccess]);

  const clearFile = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileUrl(null);
  }, [previewUrl]);

  return {
    selectedFile,
    previewUrl,
    fileUrl,
    isUploading,
    handleFileSelect,
    handleUpload,
    clearFile,
  };
};
