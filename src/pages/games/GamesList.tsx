import SearchField from "../../components/common/SearchField";
import { TABLE_STYLES } from "../../components/common/tableStyles";
import NextPageLoader from "../../features/common/NextPageLoader";
import { useGamesPage } from "../../features/games/hooks/useGamesPage";
import { Link } from "react-router-dom";

const PROVINCES = [
  "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산",
  "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
];

const GamesList = () => {
  const { hasNextPage, fetchNextPage, rows, status, setStatus, province, setProvince } =
    useGamesPage();

  return (
    <section className="w-full p-8 flex flex-col gap-4 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">경기 목록</h1>
        <SearchField paramKey={"search"} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Status filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="game_status" className="text-[11px] font-medium text-gray-300">
            상태
          </label>
          <select
            id="game_status"
            value={status ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setStatus(v === "" ? null : v);
            }}
            className="h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">전체 (기본)</option>
            <option value="open">모집중</option>
            <option value="closed">모집완료</option>
            <option value="completed">경기완료</option>
            <option value="canceled">경기취소</option>
          </select>
        </div>

        {/* Province filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="province" className="text-[11px] font-medium text-gray-300">
            지역
          </label>
          <select
            id="province"
            value={province ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setProvince(v === "" ? null : v);
            }}
            className="h-9 rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">전체 지역</option>
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={TABLE_STYLES.container}>
        <table className={`min-w-[1200px] ${TABLE_STYLES.table}`}>
          <thead className={TABLE_STYLES.head}>
            <tr className={TABLE_STYLES.headerRow}>
              <th className={TABLE_STYLES.headerCell}>ID</th>
              <th className={TABLE_STYLES.headerCell}>유형</th>
              <th className={TABLE_STYLES.headerCell}>상태</th>
              <th className={TABLE_STYLES.headerCell}>제목</th>
              <th className={TABLE_STYLES.headerCell}>시작</th>
              <th className={TABLE_STYLES.headerCell}>종료</th>
              <th className={TABLE_STYLES.headerCell}>초대 (최소/최대)</th>
              <th className={TABLE_STYLES.headerCell}>참가 인원</th>
              <th className={TABLE_STYLES.headerCell}>참가비</th>
              <th className={TABLE_STYLES.headerCell}>경기장</th>
              <th className={TABLE_STYLES.headerCell}>상세</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={11} className={TABLE_STYLES.emptyCell}>
                  결과가 없습니다.
                </td>
              </tr>
            )}
            {rows?.map((g) => {
              const statusCls =
                g.status === "completed"
                  ? "bg-emerald-600/20 text-emerald-300 ring-1 ring-inset ring-emerald-500/30"
                  : g.status === "canceled"
                    ? "bg-red-600/20 text-red-300 ring-1 ring-inset ring-red-500/30"
                    : g.status === "closed"
                      ? "bg-amber-600/20 text-amber-300 ring-1 ring-inset ring-amber-500/30"
                      : "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30";

              const statusLabelMap: Record<string, string> = {
                open: "모집중",
                closed: "모집완료",
                canceled: "경기취소",
                completed: "경기완료",
              };

              const statusLabel = statusLabelMap[g.status] ?? g.status;
              const isTeamGame = g.game_type === "team_game";

              return (
                <tr key={g.id} className={TABLE_STYLES.bodyRow}>
                  <td className={TABLE_STYLES.primaryCell}>{g.source_id}</td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        isTeamGame
                          ? "bg-purple-600/20 text-purple-300 ring-1 ring-inset ring-purple-500/30"
                          : "bg-blue-600/20 text-blue-300 ring-1 ring-inset ring-blue-500/30"
                      }`}
                    >
                      {isTeamGame ? "팀전" : "개인전"}
                    </span>
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusCls}`}>
                      {statusLabel}
                    </span>
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>{g.title || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>
                    {g.startdate} {g.starttime?.slice(0, 5)}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
                    {g.enddate ? `${g.enddate} ${g.endtime?.slice(0, 5) ?? ""}` : "-"}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>
                    {g.min_invitation}/{g.max_invitation}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>{g.num_of_participations}</td>
                  <td className={TABLE_STYLES.bodyCell}>
                    {g.fee != null ? `${g.fee.toLocaleString()}원` : "무료"}
                  </td>
                  <td className={TABLE_STYLES.bodyCell}>{g.court_name || "-"}</td>
                  <td className={TABLE_STYLES.bodyCell}>
                    <Link
                      to={`detail?gameId=${g.source_id}&tab=${isTeamGame ? "scheduleInfo" : "gameInfo"}&type=${g.game_type}`}
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
      <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
    </section>
  );
};

export default GamesList;
