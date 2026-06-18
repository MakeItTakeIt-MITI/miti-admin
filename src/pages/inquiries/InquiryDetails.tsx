import { InquiryAnswerField } from "../../features/inquries/interface/inquries";
import { useInquiryDetailPage } from "../../features/inquries/hooks/useInquiryDetailPage";
import { TABLE_STYLES } from "../../components/common/tableStyles";
import { Link } from "react-router-dom";

export const InquiryDetails = () => {
  const {
    handleSubmitReply,
    setReplyContent,
    replyContent,
    answerStatus,
    formatKoreanPhone,
    data,
  } = useInquiryDetailPage();

  const answerBadgeCls =
    data?.num_of_answers === 0
      ? "bg-rose-600/10 text-rose-400 ring-1 ring-inset ring-rose-500/20"
      : "bg-emerald-600/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Admin · Inquiries
            </p>
            <h1 className="text-2xl font-bold tracking-tight">유저 문의 상세</h1>
          </div>
          <Link
            to="/inquiries"
            className="h-9 px-4 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-650 transition-colors"
          >
            목록으로
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-8 py-6 max-w-5xl space-y-6">
        {/* 헤더 카드 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`inline-flex rounded px-2 py-0.5 text-[11px] font-semibold ${answerBadgeCls}`}
              >
                {answerStatus}
              </span>
              <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400">
                답변 수: {data?.num_of_answers ?? 0}개
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {data?.title || "제목 없음"}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 font-mono">
              <span>
                생성일:{" "}
                <span className="text-zinc-300">{data?.created_at?.slice(0, 10) || "—"}</span>
              </span>
              <span>•</span>
              <span>
                수정일:{" "}
                <span className="text-zinc-300">{data?.modified_at?.slice(0, 10) || "—"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 사용자 정보 테이블 */}
        <div className={TABLE_STYLES.container}>
          <div className="overflow-x-auto">
            <table className={`min-w-[900px] ${TABLE_STYLES.table}`}>
              <thead className={TABLE_STYLES.head}>
                <tr className={TABLE_STYLES.headerRow}>
                  <th className={`${TABLE_STYLES.headerCell} w-20`}>사용자 ID</th>
                  <th className={TABLE_STYLES.headerCell}>이메일</th>
                  <th className={TABLE_STYLES.headerCell}>닉네임</th>
                  <th className={`${TABLE_STYLES.headerCell} w-32`}>생년월일</th>
                  <th className={`${TABLE_STYLES.headerCell} w-24 text-center`}>가입수단</th>
                  <th className={`${TABLE_STYLES.headerCell} w-44 text-center`}>연락처</th>
                  <th className={`${TABLE_STYLES.headerCell} w-36`}>가입 날짜</th>
                </tr>
              </thead>
              <tbody>
                {data?.user ? (
                  <tr className={TABLE_STYLES.bodyRow}>
                    <td className={TABLE_STYLES.primaryCell}>#{data.user.id}</td>
                    <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-200`}>
                      {data.user.email}
                    </td>
                    <td className={`${TABLE_STYLES.bodyCell} text-zinc-200 font-semibold`}>
                      {data.user.nickname || "—"}
                    </td>
                    <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                      {data.user.birthday || "—"}
                    </td>
                    <td className={`${TABLE_STYLES.bodyCell} text-center`}>
                      <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {data.user.signup_method || "—"}
                      </span>
                    </td>
                    <td className={`${TABLE_STYLES.bodyCell} text-center font-mono text-zinc-400`}>
                      {formatKoreanPhone(data.user.phone)}
                    </td>
                    <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                      {data.user.created_at?.slice(0, 10) || "—"}
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
        </div>

        {/* 문의 내용 카드 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-250 pb-3 border-b border-zinc-800/80">
              문의 내용
            </h3>
            <div
              className="text-sm leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto text-zinc-200 pr-2 pt-4"
              style={{ scrollbarWidth: "thin" }}
            >
              {data?.content || "문의 내용이 없습니다."}
            </div>
          </div>

          {/* Attached Images */}
          {data?.images && data.images.length > 0 && (
            <div className="border-t border-zinc-800 pt-4 mt-2">
              <h4 className="text-xs font-semibold mb-3 text-zinc-500 font-mono">
                첨부 이미지 ({data.images.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {data.images.map((imgUrl: string, idx: number) => (
                  <a
                    key={idx}
                    href={imgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group w-28 h-28 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center cursor-pointer hover:border-zinc-700 transition-all duration-200"
                  >
                    <img
                      src={imgUrl}
                      alt={`첨부 이미지 ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='11'>Load Failed</text></svg>";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="text-[9px] text-zinc-200 bg-zinc-950/85 px-1.5 py-0.5 rounded border border-zinc-800">
                        원본 보기
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 답변 영역 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 답변 작성 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-zinc-200">관리자 답변 작성</h3>
            <textarea
              placeholder="답변을 입력하세요..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[180px] w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 resize-none transition-colors"
            />
            <button
              type="button"
              onClick={async () => {
                await handleSubmitReply();
                setReplyContent("");
              }}
              disabled={!replyContent?.trim()}
              className="w-full h-10 px-4 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg text-sm font-semibold hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              답변하기
            </button>
          </div>

          {/* 답변 내역 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-4 max-h-[360px] overflow-y-auto">
            <h3 className="text-sm font-semibold text-zinc-200">
              답변 내역 ({data?.num_of_answers ?? 0})
            </h3>
            <ul className="space-y-3">
              {data?.num_of_answers === 0 && (
                <li className="text-center text-zinc-500 text-xs py-10 font-mono">
                  아직 등록된 답변이 없습니다.
                </li>
              )}
              {data?.answers?.map((answer: InquiryAnswerField) => (
                <li
                  key={answer.id}
                  className="border border-zinc-800 rounded-lg p-3.5 text-xs bg-zinc-950/60 flex flex-col gap-2"
                >
                  <span className="font-semibold text-zinc-400 font-mono">
                    {answer.created_at.slice(0, 10)} {answer.created_at.slice(11, 16)}
                  </span>
                  <p className="text-zinc-200 whitespace-pre-line leading-relaxed">
                    {answer.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};
