import { Link, useSearchParams } from "react-router-dom";
import SearchField from "../../components/common/SearchField";
import { TABLE_STYLES } from "../../components/common/tableStyles";
import { useReportsPage } from "../../features/reports/hook/useReportsPage";
import NextPageLoader from "../../features/common/NextPageLoader";
import { ReportStatus, ReportType } from "../../features/reports/interface/reports";

const STATUS_OPTIONS: { value: ReportStatus; label: string }[] = [
  { value: "waiting", label: "대기중" },
  { value: "evidence_requested", label: "자료 요청" },
  { value: "investigation_in_progress", label: "조사진행중" },
  { value: "concluded", label: "처리완료" },
];

const statusLabel = (status: string) => {
  switch (status) {
    case "waiting":
      return "대기중";
    case "evidence_requested":
      return "자료 요청";
    case "investigation_in_progress":
      return "조사진행중";
    case "concluded":
      return "처리완료";
    default:
      return status;
  }
};

const typeLabel = (type: string) => {
  switch (type) {
    case "host_report":
      return "호스트 신고";
    case "guest_report":
      return "게스트 신고";
    case "post_report":
      return "게시글 신고";
    case "team_schedule_host_report":
      return "팀 일정 주최자 신고";
    case "user_report":
      return "사용자 신고";
    default:
      return type || "-";
  }
};

const statusBadge = (status: string) => {
  switch (status) {
    case "concluded":
      return "bg-emerald-600/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20";
    case "waiting":
      return "bg-amber-600/10 text-amber-400 ring-1 ring-inset ring-amber-500/20";
    case "evidence_requested":
      return "bg-blue-600/10 text-blue-400 ring-1 ring-inset ring-blue-500/20";
    case "investigation_in_progress":
      return "bg-purple-600/10 text-purple-400 ring-1 ring-inset ring-purple-500/20";
    default:
      return "bg-zinc-800 text-zinc-400 ring-1 ring-inset ring-zinc-700/50";
  }
};

const typeBadge = (type: ReportType) => {
  switch (type) {
    case "host_report":
      return "bg-indigo-600/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20";
    case "guest_report":
      return "bg-cyan-600/10 text-cyan-400 ring-1 ring-inset ring-cyan-500/20";
    case "post_report":
      return "bg-rose-600/10 text-rose-400 ring-1 ring-inset ring-rose-500/20";
    case "team_schedule_host_report":
      return "bg-orange-600/10 text-orange-400 ring-1 ring-inset ring-orange-500/20";
    case "user_report":
      return "bg-yellow-600/10 text-yellow-400 ring-1 ring-inset ring-yellow-500/20";
    default:
      return "bg-zinc-800 text-zinc-400 ring-1 ring-inset ring-zinc-700/50";
  }
};

const ReportsList = () => {
  const { rows, hasNextPage, fetchNextPage } = useReportsPage();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatuses = searchParams.getAll("status");

  const toggleStatus = (value: ReportStatus) => {
    const current = searchParams.getAll("status");
    const next = new URLSearchParams(searchParams);
    next.delete("status");
    if (current.includes(value)) {
      current.filter((s) => s !== value).forEach((s) => next.append("status", s));
    } else {
      [...current, value].forEach((s) => next.append("status", s));
    }
    setSearchParams(next);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Page header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-blue-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                신고 관리
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">접수된 유저 및 게임 신고 내역 목록</p>
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
              const active = selectedStatuses.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleStatus(opt.value)}
                  className={`h-7 px-3 rounded-md text-[11px] font-medium transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        <div className={TABLE_STYLES.container}>
          <div className="overflow-x-auto">
            <table className={`min-w-[1200px] ${TABLE_STYLES.table}`}>
              <thead className={TABLE_STYLES.head}>
                <tr className={TABLE_STYLES.headerRow}>
                  <th className={`${TABLE_STYLES.headerCell} w-20`}>ID</th>
                  <th className={`${TABLE_STYLES.headerCell} w-28`}>상태</th>
                  <th className={`${TABLE_STYLES.headerCell} w-36`}>타입</th>
                  <th className={TABLE_STYLES.headerCell}>신고 사유</th>
                  <th className={TABLE_STYLES.headerCell}>신고 내용</th>
                  <th className={TABLE_STYLES.headerCell}>피신고자</th>
                  <th className={TABLE_STYLES.headerCell}>신고자</th>
                  <th className={`${TABLE_STYLES.headerCell} w-44`}>신고일</th>
                  <th className={`${TABLE_STYLES.headerCell} w-16`} />
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={9} className={TABLE_STYLES.emptyCell}>
                      신고 내역이 없습니다
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r?.id} className={TABLE_STYLES.bodyRow}>
                    <td className={`${TABLE_STYLES.primaryCell} font-mono`}>#{r?.id}</td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-[11px] font-semibold ${statusBadge(r?.status)}`}
                      >
                        {statusLabel(r?.status)}
                      </span>
                    </td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <span
                        className={`inline-flex rounded px-2 py-0.5 text-[11px] font-semibold ${typeBadge(r?.report_type)}`}
                      >
                        {typeLabel(r?.report_type)}
                      </span>
                    </td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <div className="max-w-[150px] truncate" title={r?.report_reason}>
                        {r?.report_reason || "—"}
                      </div>
                    </td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <div className="max-w-[200px] truncate" title={r?.content}>
                        {r?.content || "—"}
                      </div>
                    </td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <div className="space-y-0.5">
                        <div className="text-zinc-200 font-semibold">
                          {r?.reportee?.nickname || "—"}
                        </div>
                        <div className="text-zinc-500 font-mono text-[10px]">
                          {r?.reportee?.email || "—"}
                        </div>
                      </div>
                    </td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <div className="space-y-0.5">
                        <div className="text-zinc-200 font-semibold">
                          {r?.reporter?.nickname || "—"}
                        </div>
                        <div className="text-zinc-500 font-mono text-[10px]">
                          {r?.reporter?.email || "—"}
                        </div>
                      </div>
                    </td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <span className="font-mono text-zinc-400">
                        {r?.created_at
                          ? new Date(r.created_at).toLocaleString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </span>
                    </td>

                    <td className={TABLE_STYLES.bodyCell}>
                      <Link
                        to={`detail?report_type=${r?.report_type}&reportId=${r?.id}`}
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
                ))}
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

export default ReportsList;
