import { useNavigate, useSearchParams } from "react-router-dom";
import { useNotificationsPage } from "../../features/notifications/hooks/useNotificationsPage";
import NextPageLoader from "../../features/common/NextPageLoader";
import { NotificationItem } from "../../features/notifications/interface/notifications";
import { TABLE_STYLES } from "../../components/common/tableStyles";

const formatDate = (value: string) =>
  new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

const NotificationsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const { rows, hasNextPage, fetchNextPage, isFetching } = useNotificationsPage();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value.trim();
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set("search", value);
    } else {
      next.delete("search");
    }
    setSearchParams(next);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 페이지 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-blue-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                공지사항 목록
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">공지사항 및 푸시 알림 이력 조회</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/notifications/create")}
            className="h-9 px-4 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 hover:text-white transition-colors"
          >
            + 공지사항 작성
          </button>
        </div>
      </header>

      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        {/* 검색 */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            name="search"
            type="text"
            defaultValue={search}
            placeholder="제목 또는 내용 검색"
            className="h-9 w-64 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
          />
          <button
            type="submit"
            className="h-9 px-4 rounded-lg bg-zinc-850 text-zinc-200 text-xs font-medium hover:bg-zinc-800 transition-colors border border-zinc-850 hover:border-zinc-700"
          >
            검색
          </button>
          {search && (
            <button
              type="button"
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.delete("search");
                setSearchParams(next);
              }}
              className="h-9 px-4 rounded-lg border border-zinc-800 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-700 transition-colors"
            >
              초기화
            </button>
          )}
        </form>

        {/* 테이블 */}
        <div className={TABLE_STYLES.container}>
          <div className="overflow-x-auto">
            <table className={`min-w-[600px] ${TABLE_STYLES.table}`}>
              <thead className={TABLE_STYLES.head}>
                <tr className={TABLE_STYLES.headerRow}>
                  <th className={`${TABLE_STYLES.headerCell} w-20`}>ID</th>
                  <th className={TABLE_STYLES.headerCell}>제목</th>
                  <th className={`${TABLE_STYLES.headerCell} w-48`}>등록일시</th>
                </tr>
              </thead>
              <tbody>
                {isFetching && rows.length === 0 && (
                  <tr>
                    <td colSpan={3} className={TABLE_STYLES.emptyCell}>
                      불러오는 중...
                    </td>
                  </tr>
                )}
                {!isFetching && rows.length === 0 && (
                  <tr>
                    <td colSpan={3} className={TABLE_STYLES.emptyCell}>
                      공지사항이 없습니다.
                    </td>
                  </tr>
                )}
                {rows.map((item: NotificationItem) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/notifications/${item.id}`)}
                    className={`${TABLE_STYLES.bodyRow} cursor-pointer`}
                  >
                    <td className={TABLE_STYLES.primaryCell}>#{item.id}</td>
                    <td className={`${TABLE_STYLES.bodyCell} text-zinc-200 font-medium`}>
                      {item.title}
                    </td>
                    <td className={`${TABLE_STYLES.bodyCell} font-mono text-zinc-400`}>
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))}
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
};

export default NotificationsList;
