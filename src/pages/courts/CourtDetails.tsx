import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      name: draft.name?.trim() || prev.name,
      address: draft.address?.trim() || prev.address,
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
        <div className="relative bg-gray-800 w-full max-w-md mx-auto aspect-[4/3]">
          <img
            src={imgs[idx]}
            alt={display.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {imgs.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                aria-label="Next image"
              >
                ›
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {imgs.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === idx ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-4 flex flex-col items-start gap-3">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] text-gray-400">이름</span>
              <input
                className="h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
                value={isEditing ? draft.name : display.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </label>

            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[11px] text-gray-400">주소</span>
              <input
                className="h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
                value={isEditing ? draft.address : display.address}
                onChange={(e) =>
                  setDraft({ ...draft, address: e.target.value })
                }
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </label>

            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[11px] text-gray-400">상세주소</span>
              <input
                className="h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
                value={
                  isEditing
                    ? draft.address_detail ?? ""
                    : display.address_detail ?? ""
                }
                onChange={(e) =>
                  setDraft({ ...draft, address_detail: e.target.value })
                }
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </label>

            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-[11px] text-gray-400">정보</span>
              <textarea
                rows={4}
                className="rounded-md bg-gray-800 border border-gray-700 p-3 text-xs text-gray-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
                value={isEditing ? draft.info ?? "" : display.info ?? ""}
                onChange={(e) => setDraft({ ...draft, info: e.target.value })}
                readOnly={!isEditing}
                disabled={!isEditing}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
            <div className="text-gray-400">
              latitude:{" "}
              <span className="text-gray-200">{display.latitude ?? "-"}</span>
            </div>
            <div className="text-gray-400">
              longitude:{" "}
              <span className="text-gray-200">{display.longitude ?? "-"}</span>
            </div>
          </div>

          <div className="w-full space-y-2">
            <span className="text-[11px] text-gray-400">이미지</span>
            <div className="flex flex-wrap gap-2">
              {(display.images && display.images.length > 0
                ? display.images
                : []
              )?.map((url, i) => (
                <div key={i} className="relative">
                  <img
                    src={url}
                    alt={`img-${i}`}
                    className="h-16 w-16 object-cover rounded border border-gray-700"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-rose-600 text-white text-xs"
                      aria-label="remove"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex items-center gap-2">
                <label className="h-9 inline-flex items-center px-3 rounded-md bg-gray-700 hover:bg-gray-600 text-xs text-gray-100 cursor-pointer">
                  파일 선택
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    // onChange={(e) => handleFilesAdd(e.target.files)}
                  />
                </label>
                <span className="text-[11px] text-gray-500">
                  여러 장 선택 가능
                </span>
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={startEdit}
                className="text-[11px] px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200"
              >
                편집
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={saveEdit}
                  className="text-[11px] px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                >
                  저장
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-[11px] px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-100"
                >
                  취소
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
