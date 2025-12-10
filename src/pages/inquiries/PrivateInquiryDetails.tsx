import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { usePrivateInquiryDetailsPage } from "../../features/private_inquries/hooks/usePrivateInquiryDetailsPage";

export default function PrivateInquiryDetails() {
  const {
    inquiryDetailData,
    inquiryAnswerData,
    handleSubmitReply,
    setReplyContent,
    replyContent,
  } = usePrivateInquiryDetailsPage();

  const answerStatus =
    inquiryDetailData.num_of_answers === 0 ? "미답변" : "답변완료";
  const statusCls =
    inquiryDetailData.num_of_answers === 0
      ? "bg-rose-600/20 text-rose-300 ring-1 ring-inset ring-rose-500/30"
      : "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30";

  return (
    <section className="w-full min-h-screen p-8 flex flex-col gap-6 bg-black text-white">
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold truncate">
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-amber-600/20 px-2 py-0.5 text-[18px] font-bold text-amber-300 ring-1 ring-inset ring-amber-500/30">
                  익명
                </span>
                문의 제목: {inquiryDetailData.title || "-"}
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 text-gray-300">
                생성일:{" "}
                {inquiryDetailData.created_at
                  ? new Date(inquiryDetailData.created_at).toLocaleString()
                  : "-"}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1 font-medium ${statusCls} text-[11px]`}
              >
                {answerStatus}
              </span>
              <span className="inline-flex rounded-full bg-gray-700 px-3 py-1 text-[11px] font-medium">
                답변 수: {inquiryDetailData.num_of_answers ?? 0}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">작성자(닉네임):</span>
              <span className="text-gray-200 font-medium">
                {inquiryDetailData.nickname || "익명"}
              </span>
            </div>
            <div className="text-[11px] text-gray-500">
              익명 문의는 사용자 정보가 표시되지 않습니다.
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h2 className="text-sm font-semibold mb-3">문의 내용</h2>
        <div className="text-sm leading-relaxed whitespace-pre-line max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-600 pr-2">
          {inquiryDetailData.content || "문의 내용이 없습니다."}
        </div>
      </div>

      {/* 답변 목록 */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">답변</h2>
          <span className="text-[11px] text-gray-400">
            총 {Array.isArray(inquiryAnswerData) ? inquiryAnswerData.length : 0}
            개
          </span>
        </div>

        {Array.isArray(inquiryAnswerData) && inquiryAnswerData.length > 0 ? (
          <ul className="space-y-4">
            {inquiryAnswerData.map(
              (ans: {
                id: number;
                content: string;
                created_at?: string;
                modified_at?: string;
              }) => (
                <li
                  key={ans.id}
                  className="rounded-md border border-gray-700 bg-gray-900/60 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">
                      작성일:{" "}
                      {ans.created_at
                        ? new Date(ans.created_at).toLocaleString()
                        : "-"}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      수정일:{" "}
                      {ans.modified_at
                        ? new Date(ans.modified_at).toLocaleString()
                        : "-"}
                    </span>
                  </div>
                  <div className="text-sm whitespace-pre-line text-gray-200">
                    {ans.content || "-"}
                  </div>
                </li>
              )
            )}
          </ul>
        ) : (
          <div className="text-xs text-gray-400">등록된 답변이 없습니다.</div>
        )}
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 flex flex-col gap-4">
        <h2 className="text-sm font-semibold">관리자 답변 작성</h2>
        <Textarea
          placeholder="답변을 입력하세요..."
          value={replyContent} // 값 바인딩
          onChange={(e) => setReplyContent(e.target.value)}
          className="min-h-[180px] text-sm"
        />
        <Button
          variant="destructive"
          type="button"
          onClick={async () => {
            await handleSubmitReply();
            setReplyContent("");
          }}
          disabled={!replyContent?.trim()}
          className="w-full h-10 text-sm font-semibold disabled:opacity-50"
        >
          답변하기
        </Button>
      </div>
    </section>
  );
}
