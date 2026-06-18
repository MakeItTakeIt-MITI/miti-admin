import { useNavigate } from "react-router-dom";
import { Star, MessageSquare } from "lucide-react";
import SearchField from "../../components/common/SearchField";
import { Spinner } from "../../components/common/Spinner";
import NextPageLoader from "../../features/common/NextPageLoader";
import { useReviewsPage } from "../../features/reviews/hooks/useReviewsPage";

const REVIEW_TYPE_OPTIONS = [
  { label: "전체", value: "" },
  { label: "호스트 리뷰", value: "host_review" },
  { label: "게스트 리뷰", value: "guest_review" },
];

const ReviewsList = () => {
  const navigate = useNavigate();
  const {
    rows,
    hasNextPage,
    fetchNextPage,
    reviewType,
    setReviewType,
    isLoading,
  } = useReviewsPage();

  const formatDate = (value: string) => {
    if (!value) return "-";
    return new Date(value).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rating ? "fill-amber-400 text-amber-400" : "text-zinc-700 fill-zinc-800"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Page Header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-0.5 rounded-full bg-pink-500" />
            <div>
              <h1 className="text-sm font-semibold text-white tracking-tight leading-none">
                리뷰 관리
              </h1>
              <p className="text-[11px] text-zinc-500 mt-1">경기에 대한 호스트 및 게스트 피드백/리뷰 내역 조회</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs font-mono text-zinc-400">
            {rows.length}
            <span className="text-zinc-600">개 항목</span>
          </span>
        </div>

        {/* Filters */}
        <div className="px-8 py-2.5 border-t border-zinc-800/60 flex items-center gap-3 flex-wrap">
          <SearchField paramKey="search" />

          <div className="flex items-center gap-1">
            {REVIEW_TYPE_OPTIONS.map((opt) => {
              const isActive = opt.value === "" ? !reviewType : reviewType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setReviewType(opt.value === "" ? null : reviewType === opt.value ? null : opt.value)
                  }
                  className={`h-7 px-3 rounded-md text-[11px] font-medium transition-all ${
                    isActive
                      ? "bg-pink-600 text-white shadow-sm"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-6 flex flex-col gap-6">
        {/* Loading */}
        {isLoading && rows.length === 0 && (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
              <MessageSquare className="h-7 w-7 text-zinc-500" />
            </div>
            <p className="text-sm text-zinc-400">조회된 리뷰가 없습니다.</p>
            {reviewType && (
              <button
                onClick={() => setReviewType(null)}
                className="mt-3 text-xs text-pink-400 hover:text-pink-300 transition-colors"
              >
                전체 보기
              </button>
            )}
          </div>
        )}

        {/* Review list table */}
        {rows.length > 0 && (
          <div className="w-full overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/40">
            <table className="min-w-[1000px] w-full text-xs">
              <thead className="bg-zinc-900 text-zinc-400 border-b border-zinc-800">
                <tr className="text-left font-medium">
                  <th className="px-4 py-3 w-16 text-center">ID</th>
                  <th className="px-4 py-3 w-32">구분</th>
                  <th className="px-4 py-3 w-32">별점</th>
                  <th className="px-4 py-3 w-44">리뷰어 (작성자)</th>
                  <th className="px-4 py-3 w-44">리뷰 대상 (회원)</th>
                  <th className="px-4 py-3">내용 및 태그</th>
                  <th className="px-4 py-3 w-44">등록 일시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {rows.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/reviews/detail?id=${item.id}`)}
                    className="hover:bg-zinc-900/50 transition-colors cursor-pointer"
                  >
                    {/* ID */}
                    <td className="px-4 py-4 text-center text-zinc-500 font-mono">{item.id}</td>

                    {/* 구분 */}
                    <td className="px-4 py-4">
                      {item.review_type === "host_review" ? (
                        <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                          호스트 리뷰
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold bg-pink-500/10 text-pink-400 ring-1 ring-inset ring-pink-500/20">
                          게스트 리뷰
                        </span>
                      )}
                    </td>

                    {/* 별점 */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-white">{item.rating} / 5</span>
                        {renderStars(item.rating)}
                      </div>
                    </td>

                    {/* 리뷰어 */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-zinc-200">{item.reviewer.nickname}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {item.reviewer.name} ({item.reviewer.email})
                        </span>
                      </div>
                    </td>

                    {/* 리뷰 대상 */}
                    <td className="px-4 py-4">
                      {item.reviewee ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-zinc-200">{item.reviewee.nickname}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {item.reviewee.name} ({item.reviewee.email})
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-600 italic">-</span>
                      )}
                    </td>

                    {/* 내용 및 태그 */}
                    <td className="px-4 py-4 max-w-sm">
                      <p className="text-zinc-200 truncate font-normal mb-1.5">{item.comment}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-400"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* 등록 일시 */}
                    <td className="px-4 py-4 text-zinc-500 font-mono">
                      {formatDate(item.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Infinite loading trigger */}
        {hasNextPage && !isLoading && (
          <div className="flex justify-center pt-2">
            <NextPageLoader hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default ReviewsList;
