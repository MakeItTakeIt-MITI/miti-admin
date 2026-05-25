import SearchField from "../../components/common/SearchField";
import { Spinner } from "../../components/common/Spinner";
import NextPageLoader from "../../features/common/NextPageLoader";
import CourtsCard from "../../features/courts/components/list/CourtsCard";
import { useCourtsPage } from "../../features/courts/hooks/useCourtsPage";

const CourtsList = () => {
  const { rows, hasNextPage, fetchNextPage, setProvince, PROVINCE_LIST, province, isLoading } =
    useCourtsPage();

  return (
    <section className="w-full min-h-screen bg-black p-6 md:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
              Admin · Courts
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white">경기장 관리</h1>
          </div>
          {rows.length > 0 && (
            <span className="text-xs text-gray-600">{rows.length}개 표시 중</span>
          )}
        </div>

        {/* Search */}
        <div className="max-w-lg">
          <SearchField paramKey="search" />
        </div>

        {/* Province pill filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setProvince(null)}
            className={`h-8 rounded-full px-4 text-[11px] font-medium transition-all duration-200 ${
              !province
                ? "bg-white text-black"
                : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-white/5"
            }`}
          >
            전체
          </button>
          {PROVINCE_LIST.map((p) => (
            <button
              key={p}
              onClick={() => setProvince(province === p ? null : p)}
              className={`h-8 rounded-full px-4 text-[11px] font-medium transition-all duration-200 ${
                province === p
                  ? "bg-blue-600 text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-200 border border-white/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && rows.length === 0 && (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gray-800 bg-gray-900">
              <svg
                className="h-7 w-7 text-gray-600"
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
            <p className="text-sm text-gray-500">경기장이 없습니다</p>
            {province && (
              <button
                onClick={() => setProvince(null)}
                className="mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                전체 보기
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
          <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
        )}
      </div>
    </section>
  );
};

export default CourtsList;
