import SearchField from "../../components/common/SearchField";
import { Spinner } from "../../components/common/Spinner";
import NextPageLoader from "../../features/common/NextPageLoader";
import CourtsCard from "../../features/courts/components/list/CourtsCard";
import { useCourtsPage } from "../../features/courts/hooks/useCourtsPage";

export default function CourtsList() {
  const {
    rows,
    hasNextPage,
    fetchNextPage,
    setProvince,
    PROVINCE_LIST,
    province,
    isLoading,
  } = useCourtsPage();

  return (
    <section className="w-full min-h-screen p-8 bg-gray-950">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">경기장 관리</h1>
            <p className="text-sm text-gray-400 mt-1">
              총{" "}
              <span className="text-blue-400 font-medium">{rows.length}</span>
              개의 경기장
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="flex flex-wrap items-end gap-4">
            {/* Province Filter */}
            <div className="flex-1 min-w-[200px] space-y-2">
              <label
                htmlFor="province"
                className="text-xs font-medium text-gray-300 block"
              >
                지역 필터
              </label>
              <div className="flex gap-2">
                <select
                  id="province"
                  value={province ?? ""}
                  onChange={(e) => {
                    const v = e.target.value;
                    setProvince(v === "" ? null : v);
                  }}
                  className="flex-1 h-10 rounded-lg bg-gray-800 border border-gray-700 px-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">전체 지역</option>
                  {PROVINCE_LIST.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                {province && (
                  <button
                    type="button"
                    onClick={() => setProvince(null)}
                    className="h-10 px-4 text-sm rounded-lg border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 min-w-[300px] space-y-2">
              <label className="text-xs font-medium text-gray-300 block">
                검색
              </label>
              <SearchField paramKey="search" />
            </div>
          </div>

          {/* Active Filters */}
          {province && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800">
              <span className="text-xs text-gray-400">활성 필터:</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full text-xs text-blue-400">
                <span>{province}</span>
                <button
                  onClick={() => setProvince(null)}
                  className="hover:text-blue-300"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && rows.length === 0 ? (
          <Spinner />
        ) : rows.length === 0 ? (
          /* Empty State */
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-700 mb-4"
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
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              경기장이 없습니다
            </h3>
            <p className="text-sm text-gray-500">
              {province
                ? `"${province}" 지역에 등록된 경기장이 없습니다.`
                : "등록된 경기장이 없습니다."}
            </p>
            {province && (
              <button
                onClick={() => setProvince(null)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
              >
                전체 지역 보기
              </button>
            )}
          </div>
        ) : (
          /* Courts Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rows.map((u) => (
              <CourtsCard key={u.id} u={u} />
            ))}
          </div>
        )}

        {/* Load More */}
        {hasNextPage && !isLoading && (
          <NextPageLoader
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </section>
  );
}
