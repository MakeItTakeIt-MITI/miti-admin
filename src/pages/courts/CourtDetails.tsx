import { useState } from "react";
import { Link } from "react-router-dom";
import CourtDetailsImgCard from "../../features/courts/components/details/CourtDetailsImgCard";
import CourtDetailsContainer from "../../features/courts/components/details/CourtDetailsContainer";
import ImagesContainer from "../../features/courts/components/details/ImagesContainer";
import EditActionsButton from "../../features/courts/components/details/EditActionsButton";
import CoordinatesField from "../../features/courts/components/details/CoordinatesField";

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

const placeholder = "https://via.placeholder.com/600x600.png?text=Court";

export default function CourtDetails() {
  const initialCourt: CourtDetail = {
    id: 1,
    name: "더모스트 베스킷볼 동탄오산점",
    address: "경기 오산시 동부대로568번길 87-15",
    address_detail: null,
    latitude: "37.1529123326082",
    longitude: "127.088354885662",
    info: "주차, 남/녀 화장실 구분, 차량운행, 예약, 단체 이용 가능",
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600",
      "https://images.unsplash.com/photo-1521417531058-0a438b0b0e15?q=80&w=600",
      "https://images.unsplash.com/photo-1508098682722-02e5d9d2b3d9?q=80&w=600",
    ],
  };

  const [court, setCourt] = useState<CourtDetail>(initialCourt);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<CourtDetail>(court);
  const [newImageUrl, setNewImageUrl] = useState("");

  const display = isEditing ? draft : court;

  const imgs = (
    Array.isArray(display.images) && display.images.length > 0
      ? display.images
      : [placeholder]
  ) as string[];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((p) => (p - 1 + imgs.length) % imgs.length);
  const next = () => setIdx((p) => (p + 1) % imgs.length);

  const startEdit = () => {
    setDraft(court);
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setIsEditing(false);
  };
  const saveEdit = () => {
    setCourt((prev) => ({
      ...prev,
      name: draft.name || prev.name,
      address: draft.address || prev.address,
      address_detail: draft.address_detail ?? null,
      info: draft.info,
      images: draft.images && draft.images.length > 0 ? draft.images : [],
    }));
    setIsEditing(false);
  };
  const addImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;
    setDraft((d) => ({ ...d, images: [...(d.images ?? []), url] }));
    setNewImageUrl("");
  };
  const removeImage = (i: number) => {
    setDraft((d) => ({
      ...d,
      images: (d.images ?? []).filter((_, idx) => idx !== i),
    }));
  };

  return (
    <section className="w-full p-8 flex flex-col gap-6 bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-bold text-2xl">
          경기장 상세 - ID ({display.id})
        </h1>

        <Link to="/courts" className="text-xs text-gray-400 hover:text-white">
          목록으로
        </Link>
      </div>

      {/* Image card */}
      <div className="group rounded-lg overflow-hidden border border-gray-800 bg-gray-900">
        <CourtDetailsImgCard
          idx={idx}
          imgs={imgs}
          display={display}
          prev={prev}
          next={next}
        />

        <div className="p-4 flex flex-col items-start gap-3">
          <CourtDetailsContainer
            isEditing={isEditing}
            draft={draft}
            display={display}
            setDraft={setDraft}
          />

          <CoordinatesField display={display} />

          <ImagesContainer
            isEditing={isEditing}
            display={display}
            removeImage={removeImage}
          />
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
