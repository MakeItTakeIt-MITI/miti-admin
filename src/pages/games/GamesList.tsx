import SearchField from "../../components/common/SearchField";
import NextPageLoader from "../../features/common/NextPageLoader";
import { useGamesPage } from "../../features/games/hooks/useGamesPage";
import { Link } from "react-router-dom";

const PROVINCES = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
];

const STATUS_OPTIONS = [
  { value: "", label: "전체" },
  { value: "open", label: "모집중" },
  { value: "closed", label: "모집완료" },
  { value: "completed", label: "완료" },
  { value: "canceled", label: "취소" },
];

const statusBadge: Record<string, { label: string; cls: string }> = {
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
};

const COLS = [
  { label: "ID", w: "w-16" },
  { label: "호스트타입", w: "w-24" },
  { label: "상태", w: "w-24" },
  { label: "제목", w: "" },
  { label: "일정", w: "w-48" },
  { label: "모집", w: "w-44" },
  { label: "인원 범위", w: "w-24" },
  { label: "참가비", w: "w-24" },
  { label: "경기장", w: "w-36" },
  { label: "", w: "w-14" },
];

const GamesList = () => {
  const { hasNextPage, fetchNextPage, rows, status, setStatus, province, setProvince } =
    useGamesPage();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Page header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-blue-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                경기 목록
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">픽업게임 · 게스트모집 통합 조회</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-400">
            {rows.length}
            <span className="text-zinc-600">건</span>
          </span>
        </div>

        {/* Filter bar */}
        <div className="px-8 py-2.5 border-t border-zinc-800/60 flex items-center gap-3 flex-wrap">
          <SearchField paramKey="search" />

          <div className="flex items-center gap-1">
            {STATUS_OPTIONS.map((opt) => {
              const isActive = opt.value === "" ? status === null : status === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value === "" ? null : opt.value)}
                  className={`h-7 px-3 rounded-md text-[11px] font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <select
            value={province ?? ""}
            onChange={(e) => setProvince(e.target.value === "" ? null : e.target.value)}
            className="h-7 rounded-md bg-zinc-900 border border-zinc-800 px-2.5 text-[11px] text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:text-zinc-200 transition-colors"
          >
            <option value="">전체 지역</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Table */}
      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="min-w-[1300px] w-full text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/50">
                  {COLS.map(({ label, w }) => (
                    <th
                      key={label}
                      className={`${w} px-4 py-3 text-left text-[10px] font-medium text-zinc-600 uppercase tracking-widest whitespace-nowrap`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-20 text-center text-zinc-600 text-sm">
                      검색 결과가 없습니다
                    </td>
                  </tr>
                )}
                {rows.map((g) => {
                  const isTeamGame = g.game_type === "team_game";
                  const badge = statusBadge[g.status];
                  const pct =
                    g.max_invitation > 0
                      ? Math.min(
                          100,
                          Math.round((g.num_of_participations / g.max_invitation) * 100),
                        )
                      : 0;
                  const barColor =
                    pct >= 100 ? "bg-emerald-500" : pct >= 75 ? "bg-amber-500" : "bg-blue-500";

                  return (
                    <tr
                      key={g.id}
                      className="border-t border-zinc-800/50 hover:bg-zinc-900/70 transition-colors group"
                    >
                      {/* ID */}
                      <td className="px-4 py-3 font-mono text-zinc-600 tabular-nums">
                        {g.source_id}
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded px-2 py-0.5 text-[11px] font-medium ${
                            isTeamGame
                              ? "bg-violet-500/10 text-violet-400 ring-1 ring-inset ring-violet-500/20"
                              : "bg-sky-500/10 text-sky-400 ring-1 ring-inset ring-sky-500/20"
                          }`}
                        >
                          {isTeamGame ? "팀" : "개인"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        {badge && (
                          <span
                            className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium ${badge.cls}`}
                          >
                            {badge.label}
                          </span>
                        )}
                      </td>

                      {/* Title */}
                      <td className="px-4 py-3 text-zinc-200 font-medium max-w-[200px] truncate">
                        {g.title || "—"}
                      </td>

                      {/* Schedule */}
                      <td className="px-4 py-3 tabular-nums">
                        <div className="flex flex-col gap-0.5 leading-snug">
                          <span className="text-zinc-300">
                            {g.startdate}{" "}
                            <span className="text-zinc-600">{g.starttime?.slice(0, 5)}</span>
                          </span>
                          {g.enddate ? (
                            <span className="text-zinc-500">
                              {g.enddate}{" "}
                              <span className="text-zinc-700">{g.endtime?.slice(0, 5)}</span>
                            </span>
                          ) : (
                            <span className="text-zinc-700">—</span>
                          )}
                        </div>
                      </td>

                      {/* Recruitment progress */}
                      <td className="px-4 py-3 min-w-[160px]">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-300 font-mono tabular-nums">
                              {g.num_of_participations}
                              <span className="text-zinc-600">/{g.max_invitation}</span>
                            </span>
                            <span className="text-zinc-600 tabular-nums">{pct}%</span>
                          </div>
                          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${barColor}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Range */}
                      <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">
                        <div className="flex flex-col gap-0.5 leading-snug">
                          <span>
                            최소 :{" "}
                            <span className="text-zinc-300 font-mono tabular-nums">
                              {g.min_invitation}
                            </span>
                            명
                          </span>
                          <span>
                            최대 :{" "}
                            <span className="text-zinc-300 font-mono tabular-nums">
                              {g.max_invitation}
                            </span>
                            명
                          </span>
                        </div>
                      </td>

                      {/* Fee */}
                      <td className="px-4 py-3 tabular-nums whitespace-nowrap">
                        {g.fee != null ? (
                          <span className="text-zinc-300">
                            {g.fee.toLocaleString()}
                            <span className="text-zinc-600 ml-0.5">원</span>
                          </span>
                        ) : (
                          <span className="text-zinc-600">무료</span>
                        )}
                      </td>

                      {/* Court */}
                      <td className="px-4 py-3 text-zinc-500 max-w-[160px] truncate">
                        {g.court_name || "—"}
                      </td>

                      {/* Detail link */}
                      <td className="px-4 py-3">
                        <Link
                          to={`detail?gameId=${g.source_id}&tab=${isTeamGame ? "scheduleInfo" : "gameInfo"}&type=${g.game_type}`}
                          className="inline-flex items-center gap-0.5 text-[11px] font-medium text-zinc-500 hover:text-blue-400 transition-colors"
                        >
                          보기
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {hasNextPage && (
          <div className="flex justify-center pt-2">
            <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default GamesList;
