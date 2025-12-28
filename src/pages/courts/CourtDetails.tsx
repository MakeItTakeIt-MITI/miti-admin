import { useState } from "react";
import { Link } from "react-router-dom";
import CourtDetailsImgCard from "../../features/courts/components/details/CourtDetailsImgCard";
import CourtDetailsContainer from "../../features/courts/components/details/CourtDetailsContainer";
import EditActionsButton from "../../features/courts/components/details/EditActionsButton";
import CoordinatesField from "../../features/courts/components/details/CoordinatesField";
import { useCourtsDetailPage } from "../../features/courts/hooks/useCourtsDetailPage";

type CourtDetail = {
  id: number;
  name: string;
  address: string;
  address_detail?: string | null;
  latitude?: string;
  longitude?: string;
  info?: string;
  images?: string[];
};

export default function CourtDetails() {
  const { gameDetailsData } = useCourtsDetailPage();

  const [court, setCourt] = useState(gameDetailsData);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(court);

  const startEdit = () => {
    setDraft(court);
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = () => {
    setCourt((prev: CourtDetail) => ({
      ...prev,
      name: draft.name || prev.name,
      address: draft.address || prev.address,
      address_detail: draft.address_detail ?? null,
      info: draft.info,
      images: draft.images && draft.images.length > 0 ? draft.images : [],
    }));
    setIsEditing(false);
  };

  return (
    <section className="w-full p-8 flex flex-col gap-6 bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-bold text-2xl">
          경기장 상세 - ID ({gameDetailsData.id})
        </h1>

        <Link to="/courts" className="text-xs text-gray-400 hover:text-white">
          목록으로
        </Link>
      </div>

      {/* Image card */}
      <div className="group rounded-lg overflow-hidden border py-2 border-gray-800 bg-gray-900">
        <CourtDetailsImgCard gameDetailsData={gameDetailsData} />

        <div className="p-4 flex flex-col items-start gap-3">
          <CourtDetailsContainer
            isEditing={isEditing}
            draft={draft}
            gameDetailsData={gameDetailsData}
            setDraft={setDraft}
          />

          <CoordinatesField gameDetailsData={gameDetailsData} />

          <EditActionsButton
            isEditing={isEditing}
            startEdit={startEdit}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        </div>
      </div>
    </section>
  );
}
