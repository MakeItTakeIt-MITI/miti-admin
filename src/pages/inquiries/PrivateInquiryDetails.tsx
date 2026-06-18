import { usePrivateInquiryDetailsPage } from "../../features/private_inquries/hooks/usePrivateInquiryDetailsPage";
import { Link } from "react-router-dom";

export default function PrivateInquiryDetails() {
  const { inquiryDetailData, inquiryAnswerData, handleSubmitReply, setReplyContent, replyContent } =
    usePrivateInquiryDetailsPage();

  const answerStatus = inquiryDetailData.num_of_answers === 0 ? "미답변" : "답변완료";
  const statusCls =
    inquiryDetailData.num_of_answers === 0
      ? "bg-rose-600/10 text-rose-400 ring-1 ring-inset ring-rose-500/20"
      : "bg-emerald-600/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20";

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Admin · Private Inquiries
            </p>
            <h1 className="text-2xl font-bold tracking-tight">익명 문의 상세</h1>
          </div>
          <Link
            to="/inquiries?tab=private"
            className="h-9 px-4 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-650 transition-colors"
          >
            목록으로
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-8 py-6 max-w-5xl space-y-6">
        {/* 헤더 카드 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 min-w-0 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center rounded bg-amber-950/60 border border-amber-900/60 px-2 py-0.5 text-[11px] font-bold text-amber-400">
                익명
              </span>
              <span
                className={`inline-flex rounded px-2 py-0.5 text-[11px] font-semibold ${statusCls}`}
              >
                {answerStatus}
              </span>
              <span className="inline-flex rounded px-2 py-0.5 text-[11px] font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400">
                답변 수: {inquiryDetailData.num_of_answers ?? 0}개
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight truncate">
              {inquiryDetailData.title || "제목 없음"}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 font-mono">
              <span>
                생성일:{" "}
                <span className="text-zinc-300">
                  {inquiryDetailData.created_at
                    ? new Date(inquiryDetailData.created_at).toLocaleString("ko-KR", {
                        timeZone: "Asia/Seoul",
                      })
                    : "—"}
                </span>
              </span>
            </div>
          </div>

          <div className="text-xs font-mono p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/80 min-w-[200px]">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500">작성자:</span>
              <span className="text-zinc-200 font-semibold">
                {inquiryDetailData.nickname || "익명"}
              </span>
            </div>
            <div className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
              익명 문의는 회원 상세 정보가 노출되지 않습니다.
            </div>
          </div>
        </div>

        {/* 문의 내용 카드 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h3 className="text-sm font-semibold text-zinc-250 pb-3 border-b border-zinc-800/80">
            문의 내용
          </h3>
          <div
            className="text-sm leading-relaxed whitespace-pre-line max-h-[360px] overflow-y-auto text-zinc-200 pr-2 pt-4"
            style={{ scrollbarWidth: "thin" }}
          >
            {inquiryDetailData.content || "문의 내용이 없습니다."}
          </div>
        </div>

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

          {/* 답변 목록 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-4 max-h-[360px] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
              <h3 className="text-sm font-semibold text-zinc-200">답변 내역</h3>
              <span className="text-[11px] font-mono text-zinc-500">
                총 {Array.isArray(inquiryAnswerData) ? inquiryAnswerData.length : 0}개
              </span>
            </div>

            {Array.isArray(inquiryAnswerData) && inquiryAnswerData.length > 0 ? (
              <ul className="space-y-3">
                {inquiryAnswerData.map(
                  (ans: {
                    id: number;
                    content: string;
                    created_at?: string;
                    modified_at?: string;
                  }) => (
                    <li
                      key={ans.id}
                      className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-3.5 flex flex-col gap-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] text-zinc-500 font-mono">
                        <span>
                          작성일:{" "}
                          <span className="text-zinc-400">
                            {ans.created_at
                              ? new Date(ans.created_at).toLocaleString("ko-KR", {
                                  timeZone: "Asia/Seoul",
                                })
                              : "—"}
                          </span>
                        </span>
                      </div>
                      <div className="text-xs whitespace-pre-line text-zinc-200 leading-relaxed">
                        {ans.content || "—"}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            ) : (
              <div className="text-xs text-zinc-500 text-center py-10 font-mono">
                등록된 답변이 없습니다.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
