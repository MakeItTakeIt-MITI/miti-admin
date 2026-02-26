import { useState, useRef, useEffect } from "react";
import SearchField from "../../components/common/SearchField";
import { Spinner } from "../../components/common/Spinner";
import NextPageLoader from "../../features/common/NextPageLoader";
import CourtsCard from "../../features/courts/components/list/CourtsCard";
import { useCourtsPage } from "../../features/courts/hooks/useCourtsPage";

export default function CourtsList() {
  const { rows, hasNextPage, fetchNextPage, setProvince, PROVINCE_LIST, province, isLoading } =
    useCourtsPage();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full min-h-screen bg-black p-6 md:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">경기장 관리</h1>
              <p className="mt-1 text-sm text-gray-400">
                총 <span className="font-semibold text-blue-400">{rows.length}</span>개의 경기장
              </p>
            </div>
            <div className="hidden rounded-lg border border-gray-700 bg-gray-900/70 px-3 py-2 text-xs text-gray-300 md:block">
              목록 실시간 관리
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-end gap-4">
            {/* Province Filter - Custom Dropdown */}
            <div className="min-w-[200px] flex-1 space-y-2 md:max-w-[420px]">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                지역 필터
              </label>
              <div className="flex gap-2">
                <div ref={dropdownRef} className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-4 text-left text-sm text-gray-200 transition-all hover:border-gray-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={province ? "text-white" : "text-gray-400"}>
                      {province || "전체 지역"}
                    </span>
                    <svg
                      className={`h-4 w-4 text-gray-400 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 shadow-xl">
                      <div className="p-1">
                        <button
                          onClick={() => {
                            setProvince(null);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            !province
                              ? "bg-blue-600/20 font-medium text-blue-400"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          전체 지역
                        </button>
                        {PROVINCE_LIST.map((p) => (
                          <button
                            key={p}
                            onClick={() => {
                              setProvince(p);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                              province === p
                                ? "bg-blue-600/20 font-medium text-blue-400"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {province && (
                  <button
                    type="button"
                    onClick={() => setProvince(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                    title="필터 초기화"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="min-w-[300px] flex-1 space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400">
                검색
              </label>
              <SearchField paramKey="search" />
            </div>
          </div>

          {/* Active Filters */}
          {province && (
            <div className="mt-4 flex items-center gap-2 border-t border-gray-800 pt-4">
              <span className="text-xs text-gray-400">활성 필터:</span>
              <div className="flex items-center gap-2 rounded-full border border-blue-600/20 bg-blue-600/10 px-3 py-1 text-xs text-blue-400">
                <span>{province}</span>
                <button onClick={() => setProvince(null)} className="hover:text-blue-300">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="rounded-xl border border-gray-800 bg-gray-900/60 p-8">
            <Spinner />
          </div>
        ) : rows.length === 0 ? (
          /* Empty State */
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-12 text-center">
            <svg
              className="mx-auto mb-4 h-16 w-16 text-gray-700"
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
            <h3 className="mb-2 text-lg font-semibold text-gray-300">경기장이 없습니다</h3>
            <p className="text-sm text-gray-500">
              {province
                ? `"${province}" 지역에 등록된 경기장이 없습니다.`
                : "등록된 경기장이 없습니다."}
            </p>
            {province && (
              <button
                onClick={() => setProvince(null)}
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
              >
                전체 지역 보기
              </button>
            )}
          </div>
        ) : (
          /* Courts Grid */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rows.map((u) => (
              <CourtsCard key={u.id} u={u} />
            ))}
          </div>
        )}

        {/* Load More */}
        {hasNextPage && !isLoading && (
          <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
        )}
      </div>
    </section>
  );
}
