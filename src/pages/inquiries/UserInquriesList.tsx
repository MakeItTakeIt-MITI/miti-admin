import { Link } from "react-router-dom";
import { useInquiryPage } from "../../features/inquries/hooks/useInquiryPage";
import SearchField from "../../components/common/SearchField";
import { TABLE_STYLES } from "../../components/common/tableStyles";
import NextPageLoader from "../../features/common/NextPageLoader";

export default function UserInquriesList() {
  const { rows, hasNextPage, fetchNextPage } = useInquiryPage();

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Page header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-blue-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                유저 문의 목록
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">유저 문의 내역 조회 및 답변 작성</p>
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
        </div>
      </header>

      {/* Table */}
      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        <div className={TABLE_STYLES.container}>
          <div className="overflow-x-auto">
            <table className={`min-w-[900px] ${TABLE_STYLES.table}`}>
              <thead className={TABLE_STYLES.head}>
                <tr className={TABLE_STYLES.headerRow}>
                  <th className={`${TABLE_STYLES.headerCell} w-20`}>ID</th>
                  <th className={`${TABLE_STYLES.headerCell} w-32`}>사용자 ID</th>
                  <th className={TABLE_STYLES.headerCell}>제목</th>
                  <th className={`${TABLE_STYLES.headerCell} w-24 text-center`}>답변 수</th>
                  <th className={`${TABLE_STYLES.headerCell} w-28 text-center`}>답변 상태</th>
                  <th className={`${TABLE_STYLES.headerCell} w-44`}>생성일</th>
                  <th className={`${TABLE_STYLES.headerCell} w-44`}>수정일</th>
                  <th className={`${TABLE_STYLES.headerCell} w-16`} />
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td className={TABLE_STYLES.emptyCell} colSpan={8}>
                      결과가 없습니다.
                    </td>
                  </tr>
                )}
                {rows.map((i) => {
                  const answerStatus = i.num_of_answers === 0 ? "미답변" : "답변완료";
                  const statusCls =
                    i.num_of_answers === 0
                      ? "bg-rose-600/10 text-rose-400 ring-1 ring-inset ring-rose-500/20"
                      : "bg-emerald-600/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20";
                  return (
                    <tr key={i.id} className={TABLE_STYLES.bodyRow}>
                      <td className={TABLE_STYLES.primaryCell}>{i.id}</td>
                      <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                        {i.user}
                      </td>
                      <td className={`${TABLE_STYLES.bodyCell} text-zinc-200 font-medium`}>
                        {i.title}
                      </td>
                      <td
                        className={`${TABLE_STYLES.bodyCell} text-center font-mono text-zinc-400`}
                      >
                        {i.num_of_answers}
                      </td>
                      <td className={`${TABLE_STYLES.bodyCell} text-center`}>
                        <span
                          className={`inline-flex rounded px-2 py-0.5 text-[11px] font-semibold ${statusCls}`}
                        >
                          {answerStatus}
                        </span>
                      </td>
                      <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                        {i.created_at
                          ? new Date(i.created_at).toLocaleString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                      <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                        {i.modified_at
                          ? new Date(i.modified_at).toLocaleString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </td>
                      <td className={TABLE_STYLES.bodyCell}>
                        <Link
                          to={`detail?inquiryId=${i.id}`}
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
}
