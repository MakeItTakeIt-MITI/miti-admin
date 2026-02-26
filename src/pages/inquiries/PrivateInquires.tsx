import { Link } from "react-router-dom";
import SearchField from "../../components/common/SearchField";
import { usePrivateInquiriesPage } from "../../features/private_inquries/hooks/usePrivateInquiriesPage";

export default function PrivateInquires() {
  const { rows } = usePrivateInquiriesPage();

  return (
    <section className="w-full p-8 flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">익명 문의 목록</h1>
        <SearchField paramKey="search" />
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[900px] w-full text-xs">
          <thead className="bg-gray-800 text-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">닉네임</th>
              <th className="px-4 py-3 font-medium">답변 수</th>
              <th className="px-4 py-3 font-medium">생성일</th>
              <th className="px-4 py-3 font-medium">답변 상태</th>
              <th className="px-4 py-3 font-medium">상세</th>
            </tr>
          </thead>
          <tbody>
            {rows?.length === 0 && (
              <tr>
                <td className="px-4 py-10 text-center text-gray-400" colSpan={8}>
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
                <tr
                  key={i.id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 text-white">{i.id}</td>
                  <td className="px-4 py-2 text-gray-300">{i.title}</td>
                  <td className="px-4 py-2 text-gray-300">{i.nickname}</td>
                  <td className="px-4 py-2 text-gray-300">{i.num_of_answers}</td>
                  <td className="px-4 py-2 text-gray-300">
                    {i.created_at ? new Date(i.created_at).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${statusCls}`}
                    >
                      {answerStatus}
                    </span>
                  </td>
                  <td className="px-4 py-2">
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
