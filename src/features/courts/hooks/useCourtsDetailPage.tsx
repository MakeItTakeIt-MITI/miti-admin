import { useSearchParams } from "react-router-dom";
import { useCourtsDetails } from "./query/useCourtsDetails";
import { useCallback, useState } from "react";
import { useEditCourtDetails } from "./mutation/useEditCourtDetails";
import { useGetFileUrl } from "./query/useGetFileUrl";
import { useUploadImage } from "./useUploadImage";
import { toast } from "react-toastify";

export const useCourtsDetailPage = () => {
  const [responseUploadUrl, setResponseUploadUrl] = useState<string[]>([]);
  const [file, setFile] = useState<FileList | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [searchParams] = useSearchParams();
  const courtId = Number(searchParams.get("courtId"));

  const { data, isLoading, error } = useCourtsDetails({ courtId });
  const gameDetailsData = data?.data;

  const { mutate: mutateCourtDetails } = useEditCourtDetails(courtId);

  const startEdit = () => {
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setFile(null);
    setIsEditing(false);
  };
  const saveEdit = (state: {
    name: string;
    info: string;
    images: string[];
  }) => {
    mutateCourtDetails({
      name: state.name,
      info: state.info,
      images:
        responseUploadUrl.length > 0
          ? gameDetailsData.images.concat(responseUploadUrl)
          : state.images,
    });
    setFile(null);

    setIsEditing(false);
  };

  const formData = new FormData();
  if (file) {
    formData.append("file", file[0]);
  }

  const onChangeSaveImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);
  };

  const fileType =
    (file && file[0].type.slice("image/".length)) ||
    "png" ||
    "jpg" ||
    "jpeg" ||
    "webp";

  const { data: urlData } = useGetFileUrl(fileType);
  const uploadUrl = urlData?.data[fileType]?.[0]?.upload_url;
  const contentType = urlData?.data[fileType]?.[0]?.content_type;
  const fileUrl = urlData?.data[fileType]?.[0]?.file_url;

  const { mutate: uploadImg, isPending: uploadImgPending } = useUploadImage(
    uploadUrl,
    contentType,
  );

  const uploadImgToNaverHandler = useCallback(() => {
    if (file && uploadUrl && contentType) {
      const fileToUpload = file[0];
      if (fileToUpload) {
        uploadImg(fileToUpload, {
          onSuccess: (data) => {
            const isSuccess = data.status === 200;

            if (isSuccess) {
              setResponseUploadUrl((prev) => [...prev, fileUrl]);
              toast.success("NCP 이미지 업로드 성공");
            }
          },
          onError: () => {
            toast.error("NCP 이미지 업로드 실패");
          },
        });
      }
    }
  }, [file, uploadUrl, contentType, uploadImg, fileUrl]); // Dependencies for the callback

  return {
    gameDetailsData,
    isLoading,
    error,
    mutateCourtDetails,
    startEdit,
    cancelEdit,
    saveEdit,
    isEditing,
    onChangeSaveImageHandler,
    uploadImgToNaverHandler,
    file,
    uploadImgPending,
  };
};
