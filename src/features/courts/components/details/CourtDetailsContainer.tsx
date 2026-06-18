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
  "h-9 w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs text-zinc-300 disabled:opacity-50";
const textareaCls =
  "w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-300 resize-none disabled:opacity-50";

const CourtDetailsContainer = ({ gameDetailsData }: CourtDetailsContainerProps) => {
  const display = gameDetailsData ?? {};

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
          경기장 아이디
        </span>
        <p className="flex h-9 items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-xs font-mono text-zinc-400">
          #{display.id ?? "—"}
        </p>
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
          경기장 이름
        </span>
        <input disabled className={fieldCls} value={display.name ?? ""} readOnly />
      </label>

      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">주소</span>
        <input disabled className={fieldCls} value={display.address ?? ""} readOnly />
      </label>

      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
          상세 주소
        </span>
        <input disabled className={fieldCls} value={display.address_detail ?? ""} readOnly />
      </label>

      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
          경기장 정보
        </span>
        <textarea disabled rows={4} className={textareaCls} value={display.info ?? ""} readOnly />
      </label>

      {display.images && display.images.length > 0 ? (
        <div className="sm:col-span-2 mt-2">
          <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
            이미지
          </span>
          <div className="mt-2 flex flex-wrap gap-3">
            {display.images.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`경기장 이미지 ${idx + 1}`}
                className="size-20 rounded-lg border border-zinc-800 object-cover"
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="sm:col-span-2 text-xs text-zinc-500 mt-2">등록된 이미지가 없습니다.</p>
      )}
    </div>
  );
};

export default CourtDetailsContainer;
