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
}

const fieldCls =
  "h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 text-xs text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 disabled:opacity-70";
const textareaCls =
  "w-full rounded-md border border-gray-700 bg-gray-800 p-3 text-xs text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 disabled:opacity-70";

const CourtDetailsContainer = ({ gameDetailsData }: CourtDetailsContainerProps) => {
  const display = gameDetailsData ?? {};

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-gray-500">경기장 아이디</span>
        <p className="flex h-9 items-center rounded-md border border-gray-700 bg-gray-800 px-3 text-xs tabular-nums text-gray-400">
          {display.id ?? "-"}
        </p>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-gray-500">경기장 이름</span>
        <input disabled className={fieldCls} value={display.name ?? ""} readOnly />
      </label>

      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-500">주소</span>
        <input disabled className={fieldCls} value={display.address ?? ""} readOnly />
      </label>

      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-500">상세 주소</span>
        <input disabled className={fieldCls} value={display.address_detail ?? ""} readOnly />
      </label>

      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-500">경기장 정보</span>
        <textarea disabled rows={4} className={textareaCls} value={display.info ?? ""} readOnly />
      </label>

      {display.images && display.images.length > 0 ? (
        <div className="sm:col-span-2">
          <span className="text-[11px] text-gray-500">이미지</span>
          <div className="mt-2 flex flex-wrap gap-3">
            {display.images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`경기장 이미지 ${idx + 1}`}
                className="size-20 rounded-md border border-gray-700 object-cover"
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="sm:col-span-2 text-xs text-gray-500">등록된 이미지가 없습니다.</p>
      )}
    </div>
  );
};

export default CourtDetailsContainer;
