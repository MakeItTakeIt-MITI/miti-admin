import { useMemo } from "react";
import SearchField from "../../components/common/SearchField";
import { useGamesPage } from "../../features/games/hooks/useGamesPage";
import { Link } from "react-router-dom";

const GamesList = () => {
  const {
    gamesDataPage,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useGamesPage();

  const rows = useMemo(() => {
    if (!gamesDataPage) return [];
    if (Array.isArray(gamesDataPage)) return gamesDataPage;

    return gamesDataPage;
  }, [gamesDataPage]);

  return (
    <section className="w-full  p-8  flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">경기 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={() => hasPreviousPage && fetchPreviousPage()}
          className="px-4 py-1.5 rounded-lg bg-white text-black border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
        >
          이전
        </button>
        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => hasNextPage && fetchNextPage()}
          className="px-4 py-1.5 rounded-lg bg-white text-black border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
        >
          다음
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-800 text-gray-200">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">제목</th>
              <th className="px-4 py-3 font-medium">시작</th>
              <th className="px-4 py-3 font-medium">종료</th>
              <th className="px-4 py-3 font-medium">초대 (최소/최대)</th>
              <th className="px-4 py-3 font-medium">참가 인원</th>
              <th className="px-4 py-3 font-medium">참가비</th>
              <th className="px-4 py-3 font-medium">생성일</th>
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
            {rows?.map((g: any) => {
              const statusCls =
                g.game_status === "completed"
                  ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
                  : g.game_status === "pending"
                  ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
                  : "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30";
              return (
                <tr
                  key={g.id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 text-white">{g.id}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusCls}`}
                    >
                      {g.game_status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-300">{g.title || "-"}</td>
                  <td className="px-4 py-2 text-gray-300">
                    {g.startdate} {g.starttime?.slice(0, 5)}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {g.enddate} {g.endtime?.slice(0, 5)}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {g.min_invitation}/{g.max_invitation}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {g.num_of_participations}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {g.fee ? `${g.fee.toLocaleString()}원` : "무료"}
                  </td>
                  <td className="px-4 py-2 text-gray-300">
                    {g.created_at
                      ? new Date(g.created_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`detail?gameId=${g.id}&tab=gameInfo`}
                      className="text-blue-400 hover:underline text-xs"
                    >
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
};

export default GamesList;
