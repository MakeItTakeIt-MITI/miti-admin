import { Edit } from "lucide-react";
import EditImagesField from "./EditImagesField";

interface CourtDetailsContainerProps {
  gameDetailsData: {
    id?: string;
    name?: string;
    address?: string;
    address_detail?: string;
    info?: string;
    images?: string[];
  } | null;
  isEditing: boolean;
  draft?: {
    id?: string;
    name?: string;
    address?: string;
    address_detail?: string;
    info?: string;
    images?: string[];
  };
}

const inputCls =
  "h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 outline-none disabled:opacity-80";
const textareaCls =
  "rounded-md bg-gray-800 border border-gray-700 p-3 text-xs text-gray-200 outline-none disabled:opacity-80";

const CourtDetailsContainer = ({
  gameDetailsData,
  isEditing,
  draft,
}: CourtDetailsContainerProps) => {
  const display = isEditing ? draft ?? {} : gameDetailsData ?? {};

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* ID: read-only always */}
      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-gray-400">경기장 아이디</span>
        <p className="flex items-center h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200">
          {display.id ?? "-"}
        </p>
      </label>

      {/* 이름 */}
      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-gray-400">경기장 이름</span>
        <input className={inputCls} value={display.name ?? ""} />
      </label>

      {/* 주소 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-400">주소</span>
        <input className={inputCls} value={display.address ?? ""} />
      </label>

      {/* 상세 주소 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-400">상세 주소</span>
        <input className={inputCls} value={display.address_detail ?? ""} />
      </label>

      {/* 정보 */}
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-400">정보</span>
        <textarea rows={4} className={textareaCls} value={display.info ?? ""} />
      </label>

      {/* 이미지 미리보기 */}
    </div>
  );
};

export default CourtDetailsContainer;
