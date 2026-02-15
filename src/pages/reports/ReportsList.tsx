import { Link } from "react-router-dom";
import SearchField from "../../components/common/SearchField";
import { useReportsPage } from "../../features/reports/hook/useReportsPage";
import NextPageLoader from "../../features/common/NextPageLoader";

const ReportsList = () => {
  const { rows, hasNextPage, fetchNextPage } = useReportsPage();

  // 상태 한글 변환
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

  // 신고 타입 한글 변환
  const typeLabel = (type: string) => {
    switch (type) {
      case "post_report":
        return "게시글 신고";
      case "user_report":
        return "사용자 신고";
      case "comment_report":
        return "댓글 신고";
      case "game_report":
        return "경기 신고";
      case "host_report":
        return "호스트 신고";
      default:
        return type || "-";
    }
  };

  // 상태 뱃지 클래스
  const statusBadge = (status: string) => {
    switch (status) {
      case "concluded":
        return "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30";
      case "waiting":
        return "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30";
      case "evidence_requested":
        return "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30";
      case "investigation_in_progress":
        return "bg-purple-600/20 text-purple-300 ring-1 ring-inset ring-purple-500/30";
      default:
        return "bg-gray-600/20 text-gray-300 ring-1 ring-inset ring-gray-500/30";
    }
  };

  // 타입 뱃지 클래스
  const typeBadge = (type: string) => {
    switch (type) {
      case "post_report":
        return "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30";
      case "user_report":
        return "bg-orange-600/20 text-orange-300 ring-1 ring-inset ring-orange-500/30";
      case "comment_report":
        return "bg-cyan-600/20 text-cyan-300 ring-1 ring-inset ring-cyan-500/30";
      case "game_report":
        return "bg-indigo-600/20 text-indigo-300 ring-1 ring-inset ring-indigo-500/30";
      default:
        return "bg-gray-600/20 text-gray-300 ring-1 ring-inset ring-gray-500/30";
    }
  };

  return (
    <section className="w-full min-h-screen p-8 bg-gray-950">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">신고 관리</h1>
          <p className="text-sm text-gray-400 mt-1">
            총 <span className="text-blue-400 font-medium">{rows.length}</span>
            개의 신고
          </p>
        </div>

        {/* Search */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-300 block">
              검색
            </label>
            <SearchField paramKey="search" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[1200px] w-full text-xs">
              <thead className="bg-gray-800 text-gray-200">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium w-20">ID</th>
                  <th className="px-4 py-3 font-medium w-28">상태</th>
                  <th className="px-4 py-3 font-medium w-28">타입</th>
                  <th className="px-4 py-3 font-medium">신고 사유</th>
                  <th className="px-4 py-3 font-medium">신고 내용</th>
                  <th className="px-4 py-3 font-medium">피신고자</th>
                  <th className="px-4 py-3 font-medium">신고자</th>
                  <th className="px-4 py-3 font-medium w-36">신고일</th>
                  <th className="px-4 py-3 font-medium w-16">상세</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <svg
                          className="w-12 h-12 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        <p className="text-gray-400 text-sm">
                          신고 내역이 없습니다
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr
                    key={r?.id}
                    className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    {/* ID */}
                    <td className="px-4 py-3 text-white font-medium">
                      #{r?.id}
                    </td>

                    {/* 상태 */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${statusBadge(
                          r?.report_status
                        )}`}
                      >
                        {statusLabel(r?.report_status)}
                      </span>
                    </td>

                    {/* 타입 */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${typeBadge(
                          r?.report_type
                        )}`}
                      >
                        {typeLabel(r?.report_type)}
                      </span>
                    </td>

                    {/* 신고 사유 */}
                    <td className="px-4 py-3 text-gray-300">
                      <div
                        className="max-w-[150px] truncate"
                        title={r?.report_reason}
                      >
                        {r?.report_reason || "-"}
                      </div>
                    </td>

                    {/* 신고 내용 */}
                    <td className="px-4 py-3 text-gray-300">
                      <div
                        className="max-w-[200px] truncate"
                        title={r?.content}
                      >
                        {r?.content || "-"}
                      </div>
                    </td>

                    {/* 피신고자 */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-white font-medium">
                          {r?.reportee?.nickname || "-"}
                        </div>
                        <div className="text-gray-400 text-[10px]">
                          {r?.reportee?.email || "-"}
                        </div>
                      </div>
                    </td>

                    {/* 신고자 */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <div className="text-white font-medium">
                          {r?.reporter?.nickname || "-"}
                        </div>
                        <div className="text-gray-400 text-[10px]">
                          {r?.reporter?.email || "-"}
                        </div>
                      </div>
                    </td>

                    {/* 신고일 */}
                    <td className="px-4 py-3 text-gray-300">
                      {r?.created_at
                        ? new Date(r.created_at).toLocaleString("ko-KR", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>

                    {/* 상세 */}
                    <td className="px-4 py-3">
                      <Link
                        to={`detail?reportId=${r?.id}`}
                        className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                      >
                        보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Load More */}
        {hasNextPage && (
          <NextPageLoader
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </section>
  );
};

export default ReportsList;
