import SearchField from "../../components/common/SearchField";
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
  } = useCourtsPage();

  // const { data: fileUploadUrlData } = useGetFileUrl();

  return (
    <section className="w-full p-8 flex flex-col gap-6 bg-black">
      <div className="space-y-4">
        <h1 className="text-white font-bold text-2xl">경기장 목록</h1>
        <div className="flex flex-wrap items-center gap-3">
          <label
            htmlFor="province"
            className="text-[11px] font-medium text-gray-300"
          >
            지역 필터
          </label>
          <select
            id="province"
            value={province ?? ""} // null -> ""
            onChange={(e) => {
              const v = e.target.value;
              setProvince(v === "" ? null : v);
            }}
            className="h-9 min-w-[150px] rounded-md bg-gray-800 border border-gray-700 px-3 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">전체</option>
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
              className="h-9 px-3 text-[11px] rounded-md border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
            >
              초기화
            </button>
          )}
        </div>
        <SearchField paramKey={"search"} />
      </div>

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-gray-400 text-lg mb-2">
            경기장 정보가 없습니다.
          </div>
          <p className="text-gray-500 text-sm">등록된 경기장이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rows.map((u) => (
            <CourtsCard key={u.id} u={u} />
          ))}
        </div>
      )}

      {hasNextPage && (
        <NextPageLoader
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </section>
  );
}
