import { InquiryAnswerField } from "../../features/inquries/interface/inquries";
import { useInquiryDetailPage } from "../../features/inquries/hooks/useInquiryDetailPage";
import { TABLE_STYLES } from "../../components/common/tableStyles";

export const InquiryDetails = () => {
  const {
    handleSubmitReply,
    setReplyContent,
    replyContent,
    answerStatus,
    statusCls,
    formatKoreanPhone,
    data,
  } = useInquiryDetailPage();

  return (
    <section className="w-full min-h-screen p-8 flex flex-col gap-6 bg-gray-950">
      {/* Header Card */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-white truncate">
              문의 제목: {data?.title || "-"}
            </h1>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="text-gray-300">생성일: {data?.created_at?.slice(0, 10) || "-"}</span>
              <span className="text-gray-300">
                수정일: {data?.modified_at?.slice(0, 10) || "-"}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1 font-medium ${statusCls} text-[11px]`}
              >
                {answerStatus}
              </span>
              <span className="inline-flex rounded-full bg-gray-700 px-3 py-1 text-[11px] font-medium text-gray-200">
                답변 수: {data?.num_of_answers ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Table */}
      <div className={TABLE_STYLES.container}>
        <table className={`min-w-[900px] ${TABLE_STYLES.table}`}>
          <thead className={TABLE_STYLES.head}>
            <tr className={TABLE_STYLES.headerRow}>
              <th className={TABLE_STYLES.headerCell}>사용자 ID</th>
              <th className={TABLE_STYLES.headerCell}>이메일</th>
              <th className={TABLE_STYLES.headerCell}>닉네임</th>
              <th className={TABLE_STYLES.headerCell}>생년월일</th>
              <th className={TABLE_STYLES.headerCell}>가입수단</th>
              <th className={TABLE_STYLES.headerCell}>연락처</th>
              <th className={TABLE_STYLES.headerCell}>가입 날짜</th>
            </tr>
          </thead>
          <tbody>
            {data?.user ? (
              <tr className={TABLE_STYLES.bodyRow}>
                <td className={TABLE_STYLES.primaryCell}>{data.user.id}</td>
                <td className={TABLE_STYLES.bodyCell}>{data.user.email}</td>
                <td className={TABLE_STYLES.bodyCell}>{data.user.nickname || "-"}</td>
                <td className={TABLE_STYLES.bodyCell}>{data.user.birthday || "-"}</td>
                <td className={TABLE_STYLES.bodyCell}>
                  <span className="inline-block rounded bg-gray-700 px-2 py-1 text-[10px] text-gray-200">
                    {data.user.signup_method || "-"}
                  </span>
                </td>
                <td className={TABLE_STYLES.bodyCell}>{formatKoreanPhone(data.user.phone)}</td>
                <td className={TABLE_STYLES.bodyCell}>
                  {data.user.created_at?.slice(0, 10) || "-"}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={7} className={TABLE_STYLES.emptyCell}>
                  사용자 정보가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Inquiry Content */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h2 className="text-sm font-semibold mb-3 text-white">문의 내용</h2>
        <div
          className="text-sm leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto text-gray-200 pr-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {data?.content || "문의 내용이 없습니다."}
        </div>
      </div>

      {/* Reply Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Reply Form */}
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-white">관리자 답변 작성</h2>
          <textarea
            placeholder="답변을 입력하세요..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[180px] w-full rounded-md bg-gray-900 border border-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="button"
            onClick={async () => {
              await handleSubmitReply();
              setReplyContent("");
            }}
            disabled={!replyContent?.trim()}
            className="w-full h-10 px-4 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            답변하기
          </button>
        </div>

        {/* Answer History */}
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 flex flex-col gap-4 max-h-[360px] overflow-y-auto">
          <h2 className="text-sm font-semibold text-white">
            답변 내역 ({data?.num_of_answers ?? 0})
          </h2>
          <ul className="space-y-3">
            {data?.num_of_answers === 0 && (
              <li className="text-center text-gray-400 text-xs py-4">
                아직 관리자 답변이 없습니다.
              </li>
            )}
            {data?.answers?.map((answer: InquiryAnswerField) => (
              <li
                key={answer.id}
                className="border border-gray-600 rounded-md p-3 text-xs bg-gray-900 flex flex-col gap-1"
              >
                <span className="font-bold text-gray-200">
                  {answer.created_at.slice(0, 10)} {answer.created_at.slice(11, 16)}
                </span>
                <span className="text-gray-300 whitespace-pre-line">{answer.content}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
