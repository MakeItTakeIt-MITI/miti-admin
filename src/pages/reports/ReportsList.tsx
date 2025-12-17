import { Link } from "react-router-dom";
import SearchField from "../../components/common/SearchField";
import { useReportsPage } from "../../features/reports/hook/useReportsPage";
import NextPageLoader from "../../features/common/NextPageLoader";

const ReportsList = () => {
  const { rows, hasNextPage, fetchNextPage } = useReportsPage();

  // 상태 뱃지 클래스
  const statusBadge = (s: string) =>
    s === "completed"
      ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
      : s === "waiting"
      ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
      : "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30";

  return (
    <section className="w-full  p-8  flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">회원 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      {/* table */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[1100px] w-full text-xs">
          <thead className="bg-gray-800 text-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">신고 ID</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">타입</th>
              <th className="px-4 py-3 font-medium">사유</th>
              <th className="px-4 py-3 font-medium">피신고자 닉네임</th>
              <th className="px-4 py-3 font-medium">피신고자 이메일</th>
              <th className="px-4 py-3 font-medium">신고자 닉네임</th>
              <th className="px-4 py-3 font-medium">신고자 이메일</th>
              <th className="px-4 py-3 font-medium">신고일</th>
              <th className="px-4 py-3 font-medium">상세</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  결과가 없습니다.
                </td>
              </tr>
            )}
            {rows.map((r) => (
              <tr
                key={r?.id}
                className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <td className="px-4 py-2 text-white">{r?.id}</td>
                <td className="px-4 py-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadge(
                      r?.report_status
                    )}`}
                  >
                    {r?.report_status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-300">{r?.report_type}</td>
                <td className="px-4 py-2 text-gray-300 truncate max-w-[160px]">
                  {r?.report_reason}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {r?.reportee?.nickname}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {r?.reportee?.email}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {r?.reporter?.nickname}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {r?.reporter?.email}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {r?.created_at
                    ? new Date(r.created_at).toLocaleString()
                    : "-"}
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`detail?reportId=${r?.id}`}
                    className="text-blue-400 hover:underline"
                  >
                    보기
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
};

export default ReportsList;
