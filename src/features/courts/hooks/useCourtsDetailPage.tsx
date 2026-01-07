import { useSearchParams } from "react-router-dom";
import { useCourtsDetails } from "./query/useCourtsDetails";
import { useState } from "react";
import { useEditCourtDetails } from "./mutation/useEditCourtDetails";

export const useCourtsDetailPage = () => {
  const [searchParams] = useSearchParams();
  const courtId = Number(searchParams.get("courtId"));

  const { data, isLoading, error } = useCourtsDetails({ courtId });

  const gameDetailsData = data?.data;

  const [_fileNames, setFileNames] = useState<string[]>([]);

  const onChangeHandler = (files: FileList | null) => {
    if (!files) return;

    const names = Array.from(files).map((file) => file.name);

    setFileNames(names);
  };
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: mutateCourtDetails } = useEditCourtDetails(courtId);

  const [draft, setDraft] = useState({
    name: gameDetailsData?.name,
    address: gameDetailsData?.address,
    address_detail: "details",
    // address_detail: gameDetailsData?.address_detail || "",
    info: gameDetailsData?.info,
    // images: gameDetailsData?.images || fileNames,
  });

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
    // e.preventDefault();
    mutateCourtDetails(state);
    console.log(state);
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
    onChangeHandler,
  };
};
