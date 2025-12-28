interface CourtDetailsContainerProps {
  isEditing: boolean;
  draft: {
    name: string;
    address: string;
    address_detail?: string;
    info?: string;
  };
  gameDetailsData: {
    name: string;
    address: string;
    address_detail?: string;
    info?: string;
  };
  setDraft: any;
}

const CourtDetailsContainer = ({
  isEditing,
  draft,
  gameDetailsData,
  setDraft,
}: CourtDetailsContainerProps) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-[11px] text-gray-400">이름</span>
        <input
          className="h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
          value={isEditing ? draft.name : gameDetailsData.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          readOnly={!isEditing}
          disabled={!isEditing}
        />
      </label>

      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] text-gray-400">주소</span>
        <input
          className="h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-80"
          value={isEditing ? draft.address : gameDetailsData.address}
          onChange={(e) => setDraft({ ...draft, address: e.target.value })}
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
              : gameDetailsData.address_detail ?? ""
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
          value={isEditing ? draft.info ?? "" : gameDetailsData.info ?? ""}
          onChange={(e) => setDraft({ ...draft, info: e.target.value })}
          readOnly={!isEditing}
          disabled={!isEditing}
        />
      </label>
    </div>
  );
};

export default CourtDetailsContainer;
