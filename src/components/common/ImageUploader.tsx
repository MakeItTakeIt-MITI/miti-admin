import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { Upload, X, Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { getPresignedUrl, uploadFileToStorage } from "../../features/common/api/fileUpload";
import { isValidImageFile, getImageFormatKey } from "../../features/common/utils/imageValidator";

export type ImageUploaderProps = {
  category: string; // e.g. "court_image", "image", "post_image"
  disabled?: boolean;
  className?: string;
  aspectRatio?: "video" | "square" | "portrait" | "auto"; // aspect ratios
} & (
  | {
      multiple: true;
      value?: string[];
      onChange: (value: string[]) => void;
      maxCount?: number;
    }
  | {
      multiple?: false;
      value?: string;
      onChange: (value: string) => void;
      maxCount?: never;
    }
);

export default function ImageUploader({
  category,
  multiple = false,
  value,
  onChange,
  maxCount,
  disabled = false,
  className = "",
  aspectRatio = "video",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingSingle, setIsUploadingSingle] = useState(false);
  const [uploadingList, setUploadingList] = useState<{ id: string; preview: string }[]>([]);

  // Safe cast for values
  const singleValue = typeof value === "string" ? value : "";
  const listValue = Array.isArray(value) ? value : [];

  const uploadSingleFile = async (file: File): Promise<string | null> => {
    if (!isValidImageFile(file)) {
      toast.error(
        `[${file.name}] 지원하지 않는 이미지 형식입니다. (PNG, JPEG, WEBP, HEIC, HEIF만 허용)`,
      );
      return null;
    }

    try {
      const formatKey = getImageFormatKey(file);
      const urlResponse = await getPresignedUrl(category, formatKey);
      const urlData = urlResponse.data[formatKey]?.[0];

      if (!urlData) {
        throw new Error("presigned URL 발급 실패");
      }

      const { upload_url, file_url, content_type } = urlData;

      const uploadResult = await uploadFileToStorage(upload_url, file, content_type);

      if (uploadResult.status === 200) {
        return file_url;
      } else {
        throw new Error("스토리지 업로드 실패");
      }
    } catch (error) {
      console.error(error);
      toast.error(`${file.name} 업로드에 실패했습니다.`);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple) {
      const filesArray = Array.from(files);

      if (maxCount && listValue.length + filesArray.length > maxCount) {
        toast.warning(`최대 ${maxCount}개까지만 업로드할 수 있습니다.`);
        e.target.value = "";
        return;
      }

      // Generate temp IDs and object URLs for previews of uploading files
      const newUploads = filesArray.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));

      setUploadingList((prev) => [
        ...prev,
        ...newUploads.map((u) => ({ id: u.id, preview: u.preview })),
      ]);

      // Start uploads
      const uploadPromises = newUploads.map(async (uploadItem) => {
        const fileUrl = await uploadSingleFile(uploadItem.file);

        // Remove preview URL object to prevent memory leak
        URL.revokeObjectURL(uploadItem.preview);

        // Remove from uploading list
        setUploadingList((prev) => prev.filter((p) => p.id !== uploadItem.id));

        return fileUrl;
      });

      const results = await Promise.all(uploadPromises);
      const successfulUrls = results.filter((url): url is string => url !== null);

      if (successfulUrls.length > 0) {
        (onChange as (v: string[]) => void)([...listValue, ...successfulUrls]);
      }
    } else {
      const file = files[0];
      setIsUploadingSingle(true);
      const fileUrl = await uploadSingleFile(file);
      setIsUploadingSingle(false);
      if (fileUrl) {
        (onChange as (v: string) => void)(fileUrl);
      }
    }

    // Reset file input value to allow selecting same file again
    e.target.value = "";
  };

  const handleDeleteListItem = (indexToDelete: number) => {
    if (disabled) return;
    const updated = listValue.filter((_, idx) => idx !== indexToDelete);
    (onChange as (v: string[]) => void)(updated);
  };

  const handleDeleteSingle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent file selection dialog
    if (disabled) return;
    (onChange as (v: string) => void)("");
  };

  const triggerFileSelect = () => {
    if (disabled || isUploadingSingle || uploadingList.length > 0) return;
    fileInputRef.current?.click();
  };

  const aspectClass = {
    video: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio];

  if (multiple) {
    return (
      <div className={`w-full ${className}`}>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {/* List existing images */}
          {listValue.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className={`relative aspect-square rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 group transition-all duration-200 hover:border-zinc-700`}
            >
              <img src={url} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
              {!disabled && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteListItem(idx)}
                    className="p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:border-red-500 transition-colors"
                    title="이미지 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors"
                    title="원본 보기"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}

          {/* List uploading placeholders */}
          {uploadingList.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-xl overflow-hidden border border-dashed border-zinc-800 bg-zinc-900/60 flex flex-col items-center justify-center p-3"
            >
              <img
                src={item.preview}
                alt="Uploading preview"
                className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[1px]"
              />
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin relative z-10 mb-1" />
              <span className="text-[10px] text-zinc-400 relative z-10">업로드 중...</span>
            </div>
          ))}

          {/* Upload Button */}
          {(!maxCount || listValue.length + uploadingList.length < maxCount) && (
            <button
              type="button"
              onClick={triggerFileSelect}
              disabled={disabled}
              className={`relative aspect-square rounded-xl border border-dashed transition-all duration-200 flex flex-col items-center justify-center p-4 select-none ${
                disabled
                  ? "border-zinc-800/50 bg-zinc-950/20 text-zinc-600 cursor-not-allowed"
                  : "border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 cursor-pointer"
              }`}
            >
              <Plus className="w-5 h-5 mb-1.5 transition-transform duration-200 group-hover:scale-110" />
              <span className="text-xs font-medium">이미지 추가</span>
              {maxCount && (
                <span className="text-[9px] text-zinc-500 mt-1">
                  ({listValue.length}/{maxCount})
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Single file uploader
  return (
    <div className={`w-full ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploadingSingle}
      />

      <div
        onClick={triggerFileSelect}
        className={`relative w-full ${aspectClass} rounded-xl overflow-hidden border transition-all duration-200 flex flex-col items-center justify-center p-6 select-none ${
          singleValue
            ? "border-zinc-800 bg-zinc-950 group"
            : disabled
              ? "border-zinc-800/50 bg-zinc-950/20 text-zinc-600 cursor-not-allowed"
              : "border-dashed border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 cursor-pointer"
        }`}
      >
        {isUploadingSingle ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
            <span className="text-xs text-zinc-400">이미지 업로드 중...</span>
          </div>
        ) : singleValue ? (
          <>
            <img src={singleValue} alt="Preview" className="w-full h-full object-cover" />
            {!disabled && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileSelect();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white text-xs font-semibold hover:bg-zinc-700 transition-colors"
                >
                  이미지 변경
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSingle}
                  className="p-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:border-red-500 transition-colors"
                  title="이미지 제거"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 mb-3 text-zinc-500 group-hover:text-zinc-300 group-hover:scale-105 transition-all duration-200">
              <Upload className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-zinc-300">이미지 파일 선택</span>
            <span className="text-[10px] text-zinc-500 mt-1">PNG, JPEG, WEBP 형식 지원</span>
          </div>
        )}
      </div>
    </div>
  );
}
