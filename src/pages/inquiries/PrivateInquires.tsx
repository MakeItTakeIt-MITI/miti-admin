import { Link } from "react-router-dom";
import SearchField from "../../components/common/SearchField";
import { TABLE_STYLES } from "../../components/common/tableStyles";
import { usePrivateInquiriesPage } from "../../features/private_inquries/hooks/usePrivateInquiriesPage";

export default function PrivateInquires() {
  const { rows } = usePrivateInquiriesPage();

  return (
    <section className="w-full p-8 flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">익명 문의 목록</h1>
        <SearchField paramKey="search" />
      </div>

      <div className={TABLE_STYLES.container}>
        <table className={`min-w-[900px] ${TABLE_STYLES.table}`}>
          <thead className={TABLE_STYLES.head}>
            <tr className={TABLE_STYLES.headerRow}>
              <th className={TABLE_STYLES.headerCell}>ID</th>
              <th className={TABLE_STYLES.headerCell}>제목</th>
              <th className={TABLE_STYLES.headerCell}>닉네임</th>
              <th className={TABLE_STYLES.headerCell}>답변 수</th>
              <th className={TABLE_STYLES.headerCell}>생성일</th>
              <th className={TABLE_STYLES.headerCell}>답변 상태</th>
              <th className={TABLE_STYLES.headerCell}>상세</th>
            </tr>
          </thead>
          <tbody>
            {rows?.length === 0 && (
              <tr>
                <td className={TABLE_STYLES.emptyCell} colSpan={8}>
                  결과가 없습니다.
                </td>
              </tr>
            )}
            {rows?.map((i) => {
              const answerStatus = i.num_of_answers === 0 ? "미답변" : "답변완료";
              const statusCls =
                i.num_of_answers === 0
                  ? "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30"
                  : "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30";
              return (
                <tr key={i.id} className={TABLE_STYLES.bodyRow}>
                  <td className={TABLE_STYLES.primaryCell}>{i.id}</td>
                  <td className={TABLE_STYLES.bodyCell}>{i.title}</td>
                  <td className={TABLE_STYLES.bodyCell}>{i.nickname}</td>
                  <td className={TABLE_STYLES.bodyCell}>{i.num_of_answers}</td>
                  <td className={TABLE_STYLES.bodyCell}>
                    {i.created_at ? new Date(i.created_at).toLocaleString() : "-"}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusCls}`}
                    >
                      {answerStatus}
                    </span>
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <Link to={`detail?inquiryId=${i.id}`} className="text-blue-400 hover:underline">
                      보기
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
