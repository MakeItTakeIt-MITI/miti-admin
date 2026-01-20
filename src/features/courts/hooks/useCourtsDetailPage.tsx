import { useSearchParams } from "react-router-dom";
import { useCourtsDetails } from "./query/useCourtsDetails";
import { useState } from "react";
import { useEditCourtDetails } from "./mutation/useEditCourtDetails";
import { useGetFileUrl } from "./query/useGetFileUrl";
import { useUploadImage } from "./useUploadImage";

export const useCourtsDetailPage = () => {
  const [responseUploadUrl, setResponseUploadUrl] = useState<string[]>([]);

  const [searchParams] = useSearchParams();
  const courtId = Number(searchParams.get("courtId"));

  const { data, isLoading, error } = useCourtsDetails({ courtId });

  const gameDetailsData = data?.data;

  const [isEditing, setIsEditing] = useState(false);

  const { mutate: mutateCourtDetails } = useEditCourtDetails(courtId);

  //
  const [file, setFile] = useState<FileList | null>(null);
  const formData = new FormData();
  if (file) {
    formData.append("file", file[0]);
  }

  const onChangeSaveImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);
  };

  const fileType =
    (file && file[0].type.slice("image/".length)) || "png" || "jpg";

  const { data: urlData } = useGetFileUrl(fileType);
  const uploadUrl = urlData?.data[fileType]?.[0]?.upload_url;
  const contentType = urlData?.data[fileType]?.[0]?.content_type;
  const fileUrl = urlData?.data[fileType]?.[0]?.file_url;

  const { mutate: uploadImg, isPending: uploadImgPending } = useUploadImage(
    uploadUrl,
    contentType
  );

  const uploadImgToNaverHandler = () => {
    if (file && uploadUrl && contentType) {
      const fileToUpload = file[0] as File;
      if (fileToUpload) {
        uploadImg(fileToUpload, {
          onSuccess: (data) => {
            const isSuccess = data.status === 200;

            if (isSuccess) {
              setResponseUploadUrl((prev) => [...prev, fileUrl]);
            }
          },
        });
      }
    }
  };

  const startEdit = () => {
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };
  const saveEdit = (state: {
    name: string;
    info: string;
    images: string[];
  }) => {
    const existing = gameDetailsData?.images ?? [];
    const fromState = state.images ?? [];
    const uploaded = responseUploadUrl ?? [];
    const combined = Array.from(
      new Set([...existing, ...fromState, ...uploaded])
    ).filter(Boolean);

    mutateCourtDetails({
      ...state,
      images: combined,
    });

    setIsEditing(false);
  };

  return {
    gameDetailsData,
    isLoading,
    error,
    mutateCourtDetails,
    startEdit,
    cancelEdit,
    uploadImgPending,
    saveEdit,
    isEditing,
    file,
    onChangeSaveImageHandler,
    uploadImgToNaverHandler,
  };
};
