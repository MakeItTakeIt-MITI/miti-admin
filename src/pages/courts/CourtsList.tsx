import SearchField from "../../components/common/SearchField";
import { Spinner } from "../../components/common/Spinner";
import NextPageLoader from "../../features/common/NextPageLoader";
import CourtsCard from "../../features/courts/components/list/CourtsCard";
import { useCourtsPage } from "../../features/courts/hooks/useCourtsPage";

const CourtsList = () => {
  const { rows, hasNextPage, fetchNextPage, setProvince, PROVINCE_LIST, province, isLoading } =
    useCourtsPage();

  return (
    <section className="w-full min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-blue-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                경기장 관리
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">
                등록된 전체 경기장 목록 조회 및 정보 관리
              </p>
            </div>
          </div>
          {rows.length > 0 && (
            <span className="text-xs text-zinc-500 font-mono">{rows.length}개 표시 중</span>
          )}
        </div>
      </header>

      <div className="px-8 py-6 max-w-[1600px] space-y-6 mx-auto">
        {/* Search */}
        <div className="max-w-lg">
          <SearchField paramKey="search" />
        </div>

        {/* Province pill filters */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => setProvince(null)}
            className={`h-7 rounded-full px-3.5 text-[11px] font-semibold transition-all duration-200 ${
              !province
                ? "bg-white text-zinc-950"
                : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80"
            }`}
          >
            전체
          </button>
          {PROVINCE_LIST.map((p) => (
            <button
              key={p}
              onClick={() => setProvince(province === p ? null : p)}
              className={`h-7 rounded-full px-3.5 text-[11px] font-semibold transition-all duration-200 ${
                province === p
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && rows.length === 0 && (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <svg
                className="h-6 w-6 text-zinc-650"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <p className="text-sm text-zinc-450 font-medium">검색된 경기장이 없습니다</p>
            {province && (
              <button
                onClick={() => setProvince(null)}
                className="mt-3 text-xs text-zinc-400 hover:text-white underline transition-colors"
              >
                필터 해제하기
              </button>
            )}
          </div>
        )}

        {/* Cards grid */}
        {rows.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((c) => (
              <CourtsCard key={c.id} u={c} />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasNextPage && !isLoading && (
          <div className="flex justify-center pt-4">
            <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
          </div>
        )}
      </div>
    </section>
  );
};

export default CourtsList;
