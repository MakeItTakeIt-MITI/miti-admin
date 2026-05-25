import { TeamScheduleDetail } from "../interface/game";

interface TeamScheduleInfoProps {
  data: TeamScheduleDetail | undefined;
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
  canceled: {
    label: "취소",
    cls: "bg-red-500/10 text-red-400 ring-1 ring-inset ring-red-500/25",
  },
  completed: {
    label: "완료",
    cls: "bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/25",
  },
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-start gap-2 py-1.5 border-b border-zinc-800/60 last:border-0">
    <span className="w-24 flex-shrink-0 text-[11px] text-zinc-600 pt-0.5">{label}</span>
    <span className="text-xs text-zinc-200 break-all">{value}</span>
  </div>
);

export const TeamScheduleInfo = ({ data }: TeamScheduleInfoProps) => {
  if (!data)
    return (
      <div className="flex items-center justify-center py-20 text-zinc-600 text-sm">
        불러오는 중…
      </div>
    );

  const isGame = data.schedule_type === "game";
  const confirmedCount = data.participations?.filter((p) => p.status === "confirmed").length ?? 0;
  const capacityPct =
    data.max_invitation && data.max_invitation > 0
      ? Math.min(100, Math.round((confirmedCount / data.max_invitation) * 100))
      : 0;
  const barColor =
    capacityPct >= 100 ? "bg-emerald-500" : capacityPct >= 75 ? "bg-amber-500" : "bg-blue-500";
  const st = statusConfig[data.status] ?? { label: data.status, cls: "bg-zinc-700 text-zinc-300" };

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        <div className="px-6 py-5 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-medium bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/20">
              팀전
            </span>
            <span className="text-[11px] text-zinc-600">
              {isGame ? "운동 일정" : "모임 일정"}
            </span>
            <span className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${st.cls}`}>
              {st.label}
            </span>
            <span className="text-[11px] text-zinc-600">
              생성 {data.created_at?.slice(0, 10)}
            </span>
          </div>
          <h1 className="text-lg font-semibold text-white leading-tight">{data.title}</h1>
          {isGame && data.external_title && (
            <p className="text-xs text-zinc-500">
              게스트 제목: {data.external_title}
            </p>
          )}
        </div>

        {/* Capacity bar */}
        {data.max_invitation && (
          <div className="px-6 pb-5">
            <div className="rounded-lg bg-zinc-800/60 border border-zinc-800 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">
                  모집 현황{" "}
                  <span className="font-mono text-white font-medium">{confirmedCount}</span>
                  <span className="text-zinc-600">/{data.max_invitation}명</span>
                </span>
                <span
                  className={`font-mono font-semibold text-[11px] ${
                    capacityPct >= 100
                      ? "text-emerald-400"
                      : capacityPct >= 75
                        ? "text-amber-400"
                        : "text-blue-400"
                  }`}
                >
                  {capacityPct}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${barColor}`}
                  style={{ width: `${capacityPct}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Team */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            팀 정보
          </h2>
          <div className="space-y-0">
            {data.team ? (
              <>
                <Row label="팀 ID" value={<span className="font-mono">{data.team.id}</span>} />
                <Row label="팀명" value={data.team.name} />
                <Row label="상태" value={data.team.status} />
                <Row label="레벨" value={data.team.level} />
              </>
            ) : (
              <p className="text-xs text-zinc-600 py-1">팀 정보 없음</p>
            )}
          </div>
        </div>

        {/* Host */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            호스트 정보
          </h2>
          <div className="space-y-0">
            {data.host ? (
              <>
                <Row label="ID" value={<span className="font-mono">{data.host.id}</span>} />
                <Row label="이름" value={data.host.name} />
                <Row label="닉네임" value={data.host.nickname} />
                <Row label="이메일" value={data.host.email} />
                <Row label="연락처" value={data.host.phone} />
              </>
            ) : (
              <p className="text-xs text-zinc-600 py-1">탈퇴한 사용자</p>
            )}
          </div>
        </div>

        {/* Court / Place */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            {isGame ? "코트 정보" : "장소 정보"}
          </h2>
          <div className="space-y-0">
            {isGame ? (
              data.court ? (
                <>
                  <Row label="코트 ID" value={<span className="font-mono">{data.court.id}</span>} />
                  <Row label="이름" value={data.court.name} />
                  <Row label="주소" value={data.court.address} />
                </>
              ) : (
                <p className="text-xs text-zinc-600 py-1">코트 정보 없음</p>
              )
            ) : (
              <>
                <Row label="장소명" value={data.place_name ?? "—"} />
                <Row label="주소" value={data.place_address ?? "—"} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Schedule meta */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
        <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
          일정 메타
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-[11px] text-zinc-600">시작</p>
            <p className="text-xs text-zinc-200 font-mono">
              {data.startdate} <span className="text-zinc-500">{data.starttime?.slice(0, 5)}</span>
            </p>
          </div>
          {isGame && data.enddate && (
            <div className="space-y-1">
              <p className="text-[11px] text-zinc-600">종료</p>
              <p className="text-xs text-zinc-200 font-mono">
                {data.enddate} <span className="text-zinc-500">{data.endtime?.slice(0, 5)}</span>
              </p>
            </div>
          )}
          <div className="space-y-1">
            <p className="text-[11px] text-zinc-600">팀원 참가비</p>
            <p className="text-xs text-zinc-200 font-mono">
              {data.member_fee ? `${data.member_fee.toLocaleString()}원` : "무료"}
            </p>
          </div>
          {isGame && (
            <div className="space-y-1">
              <p className="text-[11px] text-zinc-600">게스트 참가비</p>
              <p className="text-xs text-zinc-200 font-mono">
                {data.fee != null ? `${data.fee.toLocaleString()}원` : "—"}
              </p>
            </div>
          )}
          {isGame && data.min_invitation != null && (
            <div className="space-y-1">
              <p className="text-[11px] text-zinc-600">최소/최대 인원</p>
              <p className="text-xs text-zinc-200 font-mono">
                {data.min_invitation}
                <span className="text-zinc-600"> / </span>
                {data.max_invitation ?? "—"}명
              </p>
            </div>
          )}
          {isGame && (
            <div className="space-y-1">
              <p className="text-[11px] text-zinc-600">게스트 모집</p>
              <p className="text-xs">
                {data.is_external_allowed ? (
                  <span className="text-emerald-400">허용</span>
                ) : (
                  <span className="text-zinc-500">비허용</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {data.content && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            상세 내용
          </h2>
          <div
            className="text-sm leading-relaxed whitespace-pre-line max-h-72 overflow-y-auto text-zinc-300 pr-2"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#3f3f46 transparent" }}
          >
            {data.content}
          </div>
        </div>
      )}

      {/* Guest info */}
      {isGame && data.info && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 space-y-3">
          <h2 className="text-[10px] uppercase tracking-widest font-medium text-zinc-600">
            게스트 안내
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
