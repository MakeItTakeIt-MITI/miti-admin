import { TeamScheduleDetail } from "../interface/game";

interface TeamScheduleInfoProps {
  data: TeamScheduleDetail | undefined;
}

const statusClass = (s: string) =>
  s === "completed"
    ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
    : s === "canceled"
      ? "bg-red-600/20 text-red-300 ring-1 ring-inset ring-red-500/30"
      : s === "closed"
        ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
        : "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30";

const statusLabelMap: Record<string, string> = {
  open: "모집중",
  closed: "모집완료",
  canceled: "취소",
  completed: "완료",
};

export const TeamScheduleInfo = ({ data }: TeamScheduleInfoProps) => {
  if (!data) return <p className="text-gray-400 text-sm">데이터를 불러오는 중입니다.</p>;

  const isGame = data.schedule_type === "game";
  const capacityPct =
    data.max_invitation && data.max_invitation > 0
      ? Math.min(
          100,
          Math.round(((data.participations?.filter((p) => p.status === "confirmed").length ?? 0) / data.max_invitation) * 100),
        )
      : 0;

  const confirmedCount = data.participations?.filter((p) => p.status === "confirmed").length ?? 0;

  return (
    <article className="bg-gray-800 text-white rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 p-6 bg-gradient-to-r from-gray-800 to-gray-700">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex rounded px-2 py-0.5 text-xs font-medium bg-purple-600/20 text-purple-300 ring-1 ring-inset ring-purple-500/30">
                팀전
              </span>
              <span className="text-xs text-gray-400">
                {isGame ? "운동 일정" : "모임 일정"}
              </span>
            </div>
            <h1 className="text-2xl font-semibold">{data.title}</h1>
            {isGame && data.external_title && (
              <p className="text-sm text-gray-400">게스트 모집 제목: {data.external_title}</p>
            )}
            <div className="flex items-center gap-3">
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass(data.status)}`}>
                {statusLabelMap[data.status] ?? data.status}
              </span>
              <span className="text-xs text-gray-400">생성일: {data.created_at?.slice(0, 10)}</span>
            </div>
          </div>
        </div>

        {data.max_invitation && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>모집 현황 {confirmedCount}/{data.max_invitation}</span>
              <span>{capacityPct}%</span>
            </div>
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 transition-all" style={{ width: `${capacityPct}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Team */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-gray-200">팀 정보</h2>
            {data.team ? (
              <ul className="space-y-1 text-xs text-gray-300">
                <li><span className="font-medium text-gray-400">팀 ID:</span> {data.team.id}</li>
                <li><span className="font-medium text-gray-400">팀명:</span> {data.team.name}</li>
                <li><span className="font-medium text-gray-400">상태:</span> {data.team.status}</li>
                <li><span className="font-medium text-gray-400">레벨:</span> {data.team.level}</li>
              </ul>
            ) : (
              <p className="text-xs text-gray-500">팀 정보 없음</p>
            )}
          </div>

          {/* Host */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-gray-200">호스트 정보</h2>
            {data.host ? (
              <ul className="space-y-1 text-xs text-gray-300">
                <li><span className="font-medium text-gray-400">ID:</span> {data.host.id}</li>
                <li><span className="font-medium text-gray-400">이름:</span> {data.host.name}</li>
                <li><span className="font-medium text-gray-400">닉네임:</span> {data.host.nickname}</li>
                <li><span className="font-medium text-gray-400">이메일:</span> {data.host.email}</li>
                <li><span className="font-medium text-gray-400">연락처:</span> {data.host.phone}</li>
              </ul>
            ) : (
              <p className="text-xs text-gray-500">탈퇴한 사용자</p>
            )}
          </div>

          {/* Court / Place */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-3">
            <h2 className="text-sm font-semibold tracking-wide text-gray-200">
              {isGame ? "코트 정보" : "장소 정보"}
            </h2>
            {isGame ? (
              data.court ? (
                <ul className="space-y-1 text-xs text-gray-300">
                  <li><span className="font-medium text-gray-400">코트 ID:</span> {data.court.id}</li>
                  <li><span className="font-medium text-gray-400">이름:</span> {data.court.name}</li>
                  <li><span className="font-medium text-gray-400">주소:</span> {data.court.address}</li>
                </ul>
              ) : (
                <p className="text-xs text-gray-500">코트 정보 없음</p>
              )
            ) : (
              <ul className="space-y-1 text-xs text-gray-300">
                <li><span className="font-medium text-gray-400">장소명:</span> {data.place_name ?? "-"}</li>
                <li><span className="font-medium text-gray-400">주소:</span> {data.place_address ?? "-"}</li>
              </ul>
            )}
          </div>
        </div>

        {/* Schedule meta */}
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 space-y-3">
          <h2 className="text-sm font-semibold tracking-wide text-gray-200">일정 메타</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300">
            <div>
              <span className="block font-medium text-gray-400">시작</span>
              {data.startdate} {data.starttime?.slice(0, 5)}
            </div>
            {isGame && (
              <div>
                <span className="block font-medium text-gray-400">종료</span>
                {data.enddate} {data.endtime?.slice(0, 5)}
              </div>
            )}
            <div>
              <span className="block font-medium text-gray-400">팀원 참가비</span>
              {data.member_fee ? `${data.member_fee.toLocaleString()}원` : "무료"}
            </div>
            {isGame && (
              <div>
                <span className="block font-medium text-gray-400">게스트 참가비</span>
                {data.fee != null ? `${data.fee.toLocaleString()}원` : "-"}
              </div>
            )}
            {isGame && data.min_invitation != null && (
              <div>
                <span className="block font-medium text-gray-400">최소/최대 인원</span>
                {data.min_invitation}/{data.max_invitation ?? "-"}
              </div>
            )}
            {isGame && (
              <div>
                <span className="block font-medium text-gray-400">게스트 모집</span>
                {data.is_external_allowed ? "허용" : "비허용"}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {data.content && (
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-5">
            <h2 className="text-sm font-semibold tracking-wide mb-3 text-gray-200">상세 내용</h2>
            <div
              className="text-sm leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto pr-1 text-gray-300"
              style={{ scrollbarWidth: "thin" }}
            >
              {data.content}
            </div>
          </div>
        )}

        {isGame && data.info && (
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-5">
            <h2 className="text-sm font-semibold tracking-wide mb-3 text-gray-200">게스트 안내</h2>
            <div
              className="text-sm leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto pr-1 text-gray-300"
              style={{ scrollbarWidth: "thin" }}
            >
              {data.info}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
