import { useState } from "react";
import ImageUploader from "../../../../components/common/ImageUploader";

interface CourtDetailsData {
  name: string;
  info: string;
  images?: string[];
  address?: string;
  address_detail?: string;
}

interface CourtEditPayload {
  name: string;
  info: string;
  images: string[];
}

interface UpdateDetailsFormProps {
  gameDetailsData: CourtDetailsData;
  cancelEdit: () => void;
  saveEdit: (data: CourtEditPayload) => void;
}

const UpdateDetailsForm = ({ gameDetailsData, cancelEdit, saveEdit }: UpdateDetailsFormProps) => {
  const [formState, setFormState] = useState({
    name: gameDetailsData.name,
    info: gameDetailsData.info,
    images: gameDetailsData.images ?? [], // Initialize with existing images
  });

  const inputCls =
    "h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-xs text-white placeholder:text-zinc-650 outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors disabled:opacity-50";
  const textareaCls =
    "rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-xs text-white placeholder:text-zinc-650 outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors resize-none disabled:opacity-50";

  return (
    <form
      className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-zinc-400">경기장 이름</span>
        <input
          value={formState.name}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          className={inputCls}
          placeholder={gameDetailsData?.name ?? ""}
        />
      </label>
      {/* 주소 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-zinc-400">주소</span>
        <input disabled className={inputCls} placeholder={gameDetailsData?.address ?? ""} />
      </label>
      {/* 상세 주소 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-zinc-400">상세 주소</span>
        <input disabled className={inputCls} placeholder={gameDetailsData?.address_detail ?? ""} />
      </label>
      {/* 정보 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-zinc-400">정보</span>
        <textarea
          rows={4}
          value={formState.info}
          onChange={(e) => setFormState({ ...formState, info: e.target.value })}
          className={textareaCls}
          placeholder={gameDetailsData?.info ?? ""}
        />
      </label>
      {/* images upload */}
      <div className="flex flex-col gap-2 sm:col-span-2">
        <span className="text-[11px] text-zinc-400">이미지 업로드</span>
        <ImageUploader
          category="court_image"
          multiple={true}
          value={formState.images}
          onChange={(newImages) => setFormState({ ...formState, images: newImages })}
          maxCount={10}
        />
      </div>

      <div className="flex items-center gap-2 mt-4 sm:col-span-2">
        <button
          type="button"
          onClick={() => saveEdit(formState)}
          className="text-[11px] px-3.5 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white font-medium transition-colors"
        >
          저장
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="text-[11px] px-3.5 py-2 rounded-md border border-zinc-750 text-zinc-400 hover:border-zinc-650 hover:text-white font-medium transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default UpdateDetailsForm;
