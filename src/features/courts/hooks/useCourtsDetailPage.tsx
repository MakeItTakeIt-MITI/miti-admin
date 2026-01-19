import { useSearchParams } from "react-router-dom";
import { useCourtsDetails } from "./query/useCourtsDetails";
import { useState } from "react";
import { useEditCourtDetails } from "./mutation/useEditCourtDetails";
import { useGetFileUrl } from "./query/useGetFileUrl";
import { useUploadImage } from "./useUploadImage";

export const useCourtsDetailPage = () => {
  const [searchParams] = useSearchParams();
  const courtId = Number(searchParams.get("courtId"));

  const { data, isLoading, error } = useCourtsDetails({ courtId });

  const gameDetailsData = data?.data;

  // const [fileNames, setFileNames] = useState<string[]>([]);

  // const onChangeHandler = (files: FileList | null) => {
  //   if (!files) return;

  //   const names = Array.from(files).map((file) => file.name);

  //   setFileNames(names);
  // };
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

  const { data: urlData } = useGetFileUrl();
  const uploadUrl = urlData?.data.png[0].upload_url;

  console.log("UPLOADURL", uploadUrl);
  // const fileUrl = urlData?.data.png[0].file_url;
  const contentType = urlData?.data.png[0].content_type;

  const [draft, setDraft] = useState({
    name: gameDetailsData?.name,
    address: gameDetailsData?.address,
    address_detail: "details",
    // address_detail: gameDetailsData?.address_detail || "",
    info: gameDetailsData?.info,
    // images: gameDetailsData?.images || fileNames,
  });

  const { mutate: uploadImg } = useUploadImage(uploadUrl, contentType);

  const uploadImgToNaverHandler = () => {
    if (file && uploadUrl && contentType) {
      const fileToUpload = file[0] as File;
      if (fileToUpload) {
        uploadImg(fileToUpload);
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
    // let uploadedImageUrl: string | null = null;
    // if (file && uploadUrl && contentType) {
    //   const fileToUpload = file[0] as File;
    //   if (fileToUpload) {
    //     uploadImg(fileToUpload);
    //   }
    // }

    // mutateCourtDetails({
    //   ...state,
    //   images: uploadedImageUrl ? [uploadedImageUrl] : state.images,
    // });

    setIsEditing(false);
  };

  return {
    gameDetailsData,
    isLoading,
    error,
    mutateCourtDetails,
    startEdit,
    cancelEdit,
    setDraft,
    draft,
    saveEdit,
    isEditing,
    file,
    onChangeSaveImageHandler,
    uploadImgToNaverHandler,
  };
};
