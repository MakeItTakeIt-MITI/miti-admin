import { useSearchParams } from "react-router-dom";
import { useCourtsDetails } from "./query/useCourtsDetails";
import { useState } from "react";
import { useEditCourtDetails } from "./mutation/useEditCourtDetails";

export const useCourtsDetailPage = () => {
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
    setIsEditing(false);
  };
  const saveEdit = (state: { name: string; info: string; images: string[] }) => {
    mutateCourtDetails({
      name: state.name,
      info: state.info || "",
      images: state.images,
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
    saveEdit,
    isEditing,
  };
};
