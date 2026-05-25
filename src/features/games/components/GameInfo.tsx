interface GameDetailField {
  id: number;
  game_status: string;
  title: string;
  startdate: string;
  starttime: string;
  enddate: string;
  endtime: string;
  min_invitation: number;
  max_invitation: number;
  num_of_participations: number;
  fee: number;
  created_at: string;
  info: string;
  host: {
    id: number;
    email: string;
    nickname: string;
    name: string;
    birthday: string;
    signup_method: string;
    phone: string;
  };
  court: {
    id: number;
    name: string;
    address: string;
    address_detail: string | null;
  };
}

interface GameInfoProps {
  data: GameDetailField;
  handleDisplayEditContainer: () => void;
}

const statusConfig: Record<string, { label: string; cls: string }> = {
  open: {
    label: "모집중",
    cls: "bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/25",
  },
  closed: {
    label: "모집완료",
    cls: "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/25",
  },
  completed: {
    label: "완료",
    cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/25",
  },
  canceled: {
    label: "취소",
    cls: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/25",
  },
  pending: {
    label: "대기",
    cls: "bg-amber-500/10 text-amber-400 ring-1 ring-inset ring-amber-500/25",
  },
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-start gap-2 py-1.5 border-b border-zinc-800/60 last:border-0">
    <span className="w-24 flex-shrink-0 text-[11px] text-zinc-600 pt-0.5">{label}</span>
    <span className="text-xs text-zinc-200 break-all">{value}</span>
  </div>
);

export const GameInfo = ({ data, handleDisplayEditContainer }: GameInfoProps) => {
  if (!data) return null;

  const capacityPct =
    data.max_invitation > 0
      ? Math.min(100, Math.round((data.num_of_participations / data.max_invitation) * 100))
      : 0;

  const barColor =
    capacityPct >= 100 ? "bg-emerald-500" : capacityPct >= 75 ? "bg-amber-500" : "bg-blue-500";

  const st = statusConfig[data.game_status] ?? {
    label: data.game_status,
    cls: "bg-zinc-700 text-zinc-300",
  };

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="px-6 py-5 flex items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${st.cls}`}>
                {st.label}
              </span>
              <span className="text-[11px] text-zinc-600 font-mono">
                ID {data.id}
              </span>
              <span className="text-[11px] text-zinc-600">
                생성 {data.created_at?.slice(0, 10)}
              </span>
            </div>
            <h1 className="text-lg font-semibold text-white leading-tight truncate">{data.title}</h1>
          </div>
          <button
            type="button"
            onClick={handleDisplayEditContainer}
            className="flex-shrink-0 inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            수정
          </button>
        </div>

        {/* Capacity bar */}
        <div className="px-6 pb-5">
          <div className="rounded-lg bg-zinc-800/60 border border-zinc-800 p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">
                모집 현황{" "}
                <span className="font-mono text-white font-medium">
                  {data.num_of_participations}
                </span>
                <span className="text-zinc-600">/{data.max_invitation}명</span>
              </span>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="text-zinc-500">
                  최소 <span className="font-mono text-zinc-400">{data.min_invitation}</span>명
                </span>
                <span
                  className={`font-mono font-semibold ${
                    capacityPct >= 100 ? "text-emerald-400" : capacityPct >= 75 ? "text-amber-400" : "text-blue-400"
                  }`}
                >
                  {capacityPct}%
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColor}`}
                style={{ width: `${capacityPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Host */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            호스트 정보
          </h2>
          <div className="space-y-0">
            <Row label="ID" value={<span className="font-mono">{data.host?.id}</span>} />
            <Row label="이름" value={data.host?.name} />
            <Row label="닉네임" value={data.host?.nickname} />
            <Row label="이메일" value={data.host?.email} />
            <Row label="생년월일" value={data.host?.birthday} />
            <Row label="연락처" value={data.host?.phone} />
          </div>
        </div>

        {/* Court */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            코트 정보
          </h2>
          <div className="space-y-0">
            <Row label="코트 ID" value={<span className="font-mono">{data.court?.id}</span>} />
            <Row label="이름" value={data.court?.name} />
            <Row label="주소" value={data.court?.address} />
            {data.court?.address_detail && (
              <Row label="상세 주소" value={data.court.address_detail} />
            )}
          </div>
        </div>

        {/* Game meta */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            경기 메타
          </h2>
          <div className="space-y-0">
            <Row
              label="시작"
              value={
                <span className="font-mono">
                  {data.startdate}{" "}
                  <span className="text-zinc-500">{data.starttime?.slice(0, 5)}</span>
                </span>
              }
            />
            <Row
              label="종료"
              value={
                <span className="font-mono">
                  {data.enddate}{" "}
                  <span className="text-zinc-500">{data.endtime?.slice(0, 5)}</span>
                </span>
              }
            />
            <Row
              label="참가비"
              value={
                data.fee ? (
                  <span className="font-mono">{data.fee.toLocaleString()}원</span>
                ) : (
                  <span className="text-zinc-600">무료</span>
                )
              }
            />
            <Row
              label="최소/최대"
              value={
                <span className="font-mono">
                  {data.min_invitation}
                  <span className="text-zinc-600"> / </span>
                  {data.max_invitation}명
                </span>
              }
            />
            <Row
              label="현재 인원"
              value={
                <span className="font-mono">{data.num_of_participations}명</span>
              }
            />
          </div>
        </div>
      </div>

      {/* Info text */}
      {data.info && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            상세 안내
          </h2>
          <div
            className="text-sm leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto text-zinc-300 pr-2"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}
          >
            {data.info}
          </div>
        </div>
      )}
    </div>
  );
};
