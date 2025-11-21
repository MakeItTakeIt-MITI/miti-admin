import { InquiryAnswerField } from "../../features/inquries/interface/inquries";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { useInquiryDetailPage } from "../../features/inquries/hooks/useInquiryDetailPage";

export const InquiryDetails = () => {
  const {
    handleSubmitReply,
    setReplyContent,
    replyContent, // 추가: 훅에서 replyContent 받아오기 (훅에 없으면 훅 수정 필요)
    answerStatus,
    statusCls,
    formatKoreanPhone,
    data,
  } = useInquiryDetailPage();

  return (
    <section className="w-full min-h-screen p-8 flex flex-col gap-6 bg-black text-white">
      {/* Summary Header (본문 제거) */}
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold truncate">
              문의 제목: {data?.title || "-"}
            </h1>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="text-gray-300">
                생성일: {data?.created_at?.slice(0, 10) || "-"}
              </span>
              <span className="text-gray-300">
                수정일: {data?.modified_at?.slice(0, 10) || "-"}
              </span>
              <span
                className={`inline-flex rounded-full px-3 py-1 font-medium ${statusCls} text-[11px]`}
              >
                {answerStatus}
              </span>
              <span className="inline-flex rounded-full bg-gray-700 px-3 py-1 text-[11px] font-medium">
                답변 수: {data?.num_of_answers ?? 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[900px] w-full text-xs">
          <thead className="bg-gray-800 text-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">사용자 ID</th>
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">닉네임</th>
              <th className="px-4 py-3 font-medium">생년월일</th>
              <th className="px-4 py-3 font-medium">가입수단</th>
              <th className="px-4 py-3 font-medium">연락처</th>
              <th className="px-4 py-3 font-medium">가입 날짜</th>
            </tr>
          </thead>
          <tbody>
            {data?.user ? (
              <tr className="border-t border-gray-700 hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2 text-white">{data.user.id}</td>
                <td className="px-4 py-2 text-gray-300">{data.user.email}</td>
                <td className="px-4 py-2 text-gray-300">
                  {data.user.nickname || "-"}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {data.user.birthday || "-"}
                </td>
                <td className="px-4 py-2">
                  <span className="inline-block rounded bg-gray-700 px-2 py-1 text-[10px] text-gray-200">
                    {data.user.signup_method || "-"}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {formatKoreanPhone(data.user.phone)}
                </td>
                <td className="px-4 py-2 text-gray-300">
                  {data.user.created_at?.slice(0, 10) || "-"}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                  사용자 정보가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        <h2 className="text-sm font-semibold mb-3">문의 내용</h2>
        <div
          className="text-sm leading-relaxed whitespace-pre-line max-h-[320px] overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-600 pr-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {data?.content || "문의 내용이 없습니다."}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
              setReplyContent(""); // 클릭 후 입력창 비우기
            }}
            disabled={!replyContent?.trim()}
            className="w-full h-10 text-sm font-semibold disabled:opacity-50"
          >
            답변하기
          </Button>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 flex flex-col gap-4 max-h-[360px] overflow-y-auto">
          <h2 className="text-sm font-semibold">
            답변 내역 ({data?.num_of_answers ?? 0})
          </h2>
          <ul className="space-y-3">
            {data?.num_of_answers === 0 && (
              <li className="text-center text-gray-400 text-xs">
                아직 관리자 답변이 없습니다.
              </li>
            )}
            {data?.answers?.map((answer: InquiryAnswerField) => (
              <li
                key={answer.id}
                className="border border-gray-600 rounded-md p-3 text-xs bg-gray-900 flex flex-col gap-1"
              >
                <span className="font-bold text-gray-200">
                  {answer.created_at.slice(0, 10)}{" "}
                  {answer.created_at.slice(11, 16)}
                </span>
                <span className="text-gray-300 whitespace-pre-line">
                  {answer.content}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
