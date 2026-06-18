import { useNavigate, useSearchParams } from "react-router-dom";
import { usePopupsPage } from "../../features/popups/hooks/usePopupsPage";
import { useAdvertisementsPage } from "../../features/advertisements/hooks/useAdvertisementsPage";
import NextPageLoader from "../../features/common/NextPageLoader";
import { PopupItem } from "../../features/popups/interface/popups";
import { AdvertisementItem } from "../../features/advertisements/interface/advertisements";
import { getImageUrl, NO_IMAGE_FALLBACK } from "../../utils/image";

const formatDate = (value: string) =>
  new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

const PopupsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = searchParams.get("tab") || "popup";
  const currentStatus = searchParams.get("status") || "all";

  // Fetch only active tab data
  const {
    rows: popupRows,
    hasNextPage: popupHasNextPage,
    fetchNextPage: popupFetchNextPage,
    isFetching: popupIsFetching,
  } = usePopupsPage({ enabled: currentTab === "popup" });

  const {
    rows: adRows,
    hasNextPage: adHasNextPage,
    fetchNextPage: adFetchNextPage,
    isFetching: adIsFetching,
  } = useAdvertisementsPage({ enabled: currentTab === "advertisement" });

  const activeRows = currentTab === "popup" ? popupRows : adRows;
  const hasNextPage = currentTab === "popup" ? popupHasNextPage : adHasNextPage;
  const fetchNextPage = currentTab === "popup" ? popupFetchNextPage : adFetchNextPage;
  const isFetching = currentTab === "popup" ? popupIsFetching : adIsFetching;

  const handleTabChange = (tab: "popup" | "advertisement") => {
    const next = new URLSearchParams();
    next.set("tab", tab);
    next.set("status", "all");
    setSearchParams(next);
  };

  const handleStatusFilter = (status: string) => {
    const next = new URLSearchParams(searchParams);
    if (status === "all") {
      next.delete("status");
    } else {
      next.set("status", status);
    }
    setSearchParams(next);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* 1. 페이지 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
              Admin · Marketing
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white">광고/팝업 관리</h1>
          </div>
          <button
            onClick={() => {
              if (currentTab === "popup") {
                navigate("/popups/create");
              } else {
                navigate("/popups/advertisements/create");
              }
            }}
            className="h-9 px-4 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
          >
            {currentTab === "popup" ? "+ 새 팝업 등록" : "+ 새 광고 등록"}
          </button>
        </div>
      </header>

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="flex-1 px-8 py-6 flex flex-col gap-4">
        {/* 탭 헤더 */}
        <div className="flex gap-6 border-b border-zinc-800">
          <button
            onClick={() => handleTabChange("popup")}
            className={`pb-3 text-sm font-semibold transition-all relative ${
              currentTab === "popup"
                ? "text-blue-500 font-bold border-b-2 border-blue-500"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            팝업 관리
          </button>
          <button
            onClick={() => handleTabChange("advertisement")}
            className={`pb-3 text-sm font-semibold transition-all relative ${
              currentTab === "advertisement"
                ? "text-blue-500 font-bold border-b-2 border-blue-500"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            광고 관리
          </button>
        </div>

        {/* 3. 상태 필터 탭 */}
        <div className="flex gap-2 pb-2">
          {currentTab === "popup"
            ? (["all", "active", "inactive"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleStatusFilter(tab)}
                  className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                    currentStatus === tab
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab === "all" ? "전체" : tab === "active" ? "활성" : "비활성"}
                </button>
              ))
            : (["all", "active", "expired"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleStatusFilter(tab)}
                  className={`px-4 py-2 text-xs font-medium rounded-md transition-colors ${
                    currentStatus === tab
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab === "all" ? "전체" : tab === "active" ? "활성" : "만료"}
                </button>
              ))}
        </div>

        {/* 4. 데이터 테이블 */}
        <div className="w-full overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
          {currentTab === "popup" ? (
            /* ==================== 팝업 테이블 ==================== */
            <table className="min-w-[900px] w-full text-xs">
              <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium w-16 text-center">ID</th>
                  <th className="px-4 py-3 font-medium w-24">이미지</th>
                  <th className="px-4 py-3 font-medium">제목 / 부제목</th>
                  <th className="px-4 py-3 font-medium w-48">버튼 및 URL</th>
                  <th className="px-4 py-3 font-medium w-32 text-center">노출 기간</th>
                  <th className="px-4 py-3 font-medium w-20 text-center">상태</th>
                  <th className="px-4 py-3 font-medium w-44">등록일시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {isFetching && activeRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-zinc-500">
                      불러오는 중...
                    </td>
                  </tr>
                )}
                {!isFetching && activeRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-zinc-500">
                      등록된 팝업이 없습니다.
                    </td>
                  </tr>
                )}
                {(activeRows as PopupItem[]).map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/popups/detail?id=${item.id}`)}
                    className="hover:bg-zinc-900/50 transition-colors cursor-pointer border-t border-zinc-800 first:border-0"
                  >
                    <td className="px-4 py-3 text-center text-zinc-500 font-mono">{item.id}</td>
                    <td className="px-4 py-3">
                      <div className="w-16 h-12 rounded overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            e.currentTarget.src = NO_IMAGE_FALLBACK;
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      <div className="font-semibold text-white text-sm">{item.title}</div>
                      <div className="text-zinc-500 text-xs mt-0.5 truncate">
                        {item.subtitle || "부제목 없음"}
                      </div>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <span className="inline-block px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded text-[10px] font-semibold mb-1">
                        {item.button_text}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-400 hover:underline truncate max-w-[180px]"
                      >
                        {item.url}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center text-zinc-300">
                      {item.valid_until ? (
                        <span className="font-mono">{item.valid_until} 까지</span>
                      ) : (
                        <span className="text-zinc-500">제한 없음</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.status === "active" ? (
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                          활성
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                          비활성
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 font-mono">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* ==================== 광고 테이블 ==================== */
            <table className="min-w-[900px] w-full text-xs">
              <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium w-16 text-center">ID</th>
                  <th className="px-4 py-3 font-medium w-24">썸네일</th>
                  <th className="px-4 py-3 font-medium w-64">제목 / 부제목</th>
                  <th className="px-4 py-3 font-medium">광고 내용</th>
                  <th className="px-4 py-3 font-medium w-32 text-center">만료일</th>
                  <th className="px-4 py-3 font-medium w-20 text-center">상태</th>
                  <th className="px-4 py-3 font-medium w-44">등록일시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {isFetching && activeRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-zinc-500">
                      불러오는 중...
                    </td>
                  </tr>
                )}
                {!isFetching && activeRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-zinc-500">
                      등록된 광고가 없습니다.
                    </td>
                  </tr>
                )}
                {(activeRows as AdvertisementItem[]).map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/popups/advertisements/detail?id=${item.id}`)}
                    className="hover:bg-zinc-900/50 transition-colors cursor-pointer border-t border-zinc-800 first:border-0"
                  >
                    <td className="px-4 py-3 text-center text-zinc-500 font-mono">{item.id}</td>
                    <td className="px-4 py-3">
                      <div className="w-16 h-12 rounded overflow-hidden bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <img
                          src={getImageUrl(item.thumbnail_image_path)}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                          onError={(e) => {
                            e.currentTarget.src = NO_IMAGE_FALLBACK;
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      <div className="font-semibold text-white text-sm">{item.title}</div>
                      <div className="text-zinc-500 text-xs mt-0.5 truncate">
                        {item.subtitle || "부제목 없음"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300 max-w-sm truncate">{item.content}</td>
                    <td className="px-4 py-3 text-center text-zinc-300">
                      {item.expire_at ? (
                        <span className="font-mono">{item.expire_at}</span>
                      ) : (
                        <span className="text-zinc-500">만료일 없음</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {item.advertisement_status === "active" ? (
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                          활성
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                          만료
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-400 font-mono">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 5. 페이지네이션 더 보기 */}
        <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
      </main>
    </div>
  );
};

export default PopupsList;
