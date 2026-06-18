import { useNavigate, useSearchParams } from "react-router-dom";
import { Star, ArrowLeft, Tag, Calendar, User, Info, UserCheck } from "lucide-react";
import { Spinner } from "../../components/common/Spinner";
import { useReviewDetail } from "../../features/reviews/hooks/query/useReviewDetail";

const ReviewDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const reviewId = Number(idParam);

  const { data, isLoading } = useReviewDetail(reviewId);

  const formatDate = (value: string) => {
    if (!value) return "-";
    return new Date(value).toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-amber-400 text-amber-400" : "text-zinc-700 fill-zinc-800"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-md text-center">
          <Info className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">리뷰 정보를 찾을 수 없습니다.</h2>
          <p className="text-sm text-zinc-400 mb-6">존재하지 않거나 이미 삭제된 리뷰일 수 있습니다.</p>
          <button
            onClick={() => navigate("/reviews")}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold rounded-lg transition-colors"
          >
            리뷰 목록으로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Page Header */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="h-7 w-0.5 rounded-full bg-pink-500" />
            <div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Admin · Reviews
              </p>
              <h1 className="text-xl font-bold tracking-tight">리뷰 상세 정보</h1>
            </div>
          </div>
          <div className="flex gap-2">
            {data.review_type === "host_review" ? (
              <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                호스트 리뷰
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold bg-pink-500/10 text-pink-400 ring-1 ring-inset ring-pink-500/20">
                게스트 리뷰
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 px-8 py-6 max-w-5xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left/Middle Column (Review content & Target Game) */}
          <div className="md:col-span-2 space-y-6">
            {/* Review Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  리뷰 및 피드백 내용
                </span>
                <span className="text-xs text-zinc-500 font-mono">ID: {data.id}</span>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/80 rounded-lg p-3">
                <span className="text-sm text-zinc-400 font-medium">별점 평점:</span>
                {renderStars(data.rating)}
                <span className="text-sm font-semibold text-white ml-1">{data.rating} / 5</span>
              </div>

              {/* Comments */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">리뷰 코멘트</label>
                <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-lg text-sm text-zinc-200 whitespace-pre-line leading-relaxed min-h-[80px]">
                  {data.comment || <span className="text-zinc-600 italic">남긴 멘트가 없습니다.</span>}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">선택 태그</label>
                <div className="flex flex-wrap gap-2">
                  {data.tags && data.tags.length > 0 ? (
                    data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-300"
                      >
                        <Tag className="w-3 h-3 text-zinc-500 mr-1.5" />
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-600 italic">선택된 태그가 없습니다.</span>
                  )}
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-900 pt-3">
                <span>등록 일시</span>
                <span className="font-mono text-zinc-400">{formatDate(data.created_at)}</span>
              </div>
            </div>

            {/* Target Game Details */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 space-y-4">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                리뷰 대상 경기 (Target Game)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-lg flex flex-col justify-center">
                  <span className="text-[10px] text-zinc-500 font-semibold mb-1">경기명</span>
                  <a
                    href={`/games/detail?id=${data.target.id}`}
                    className="text-sm font-semibold text-blue-400 hover:underline truncate"
                  >
                    {data.target.title}
                  </a>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-lg flex flex-col justify-center">
                  <span className="text-[10px] text-zinc-500 font-semibold mb-1">경기 상태</span>
                  <div>
                    {data.target.game_status === "confirmed" ? (
                      <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        진행 확정
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                        {data.target.game_status}
                      </span>
                    )}
                  </div>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-850 p-4 rounded-lg flex flex-col justify-center sm:col-span-2">
                  <span className="text-[10px] text-zinc-500 font-semibold mb-1">경기 시간</span>
                  <div className="text-sm font-mono text-zinc-300 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {data.target.startdate} {data.target.starttime.substring(0, 5)} ~ {data.target.endtime.substring(0, 5)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Reviewer & Reviewee profiles) */}
          <div className="space-y-6">
            {/* Reviewer Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 space-y-4">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                리뷰 작성자 (Reviewer)
              </span>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400">
                    <User className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{data.reviewer.nickname}</h3>
                    <p className="text-[11px] text-zinc-500">{data.reviewer.name}</p>
                  </div>
                </div>

                <div className="border-t border-zinc-900 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">이메일</span>
                    <span className="text-zinc-300 font-mono">{data.reviewer.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">연락처</span>
                    <span className="text-zinc-300 font-mono">{data.reviewer.phone || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">생년월일</span>
                    <span className="text-zinc-300 font-mono">{data.reviewer.birthday || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">가입 경로</span>
                    <span className="text-zinc-300 font-mono uppercase">{data.reviewer.signup_method}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/users/detail?id=${data.reviewer.id}`)}
                  className="w-full h-8 text-center text-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-900/80 rounded font-semibold text-zinc-400 hover:text-zinc-200 transition-colors mt-2"
                >
                  회원 상세 정보 보기
                </button>
              </div>
            </div>

            {/* Reviewee Card (Only show if reviewee details are present) */}
            {data.reviewee && (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 space-y-4">
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                  리뷰 대상자 (Reviewee)
                </span>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-400">
                      <UserCheck className="w-5 h-5 text-zinc-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{data.reviewee.nickname}</h3>
                      <p className="text-[11px] text-zinc-500">{data.reviewee.name}</p>
                    </div>
                  </div>

                  <div className="border-t border-zinc-900 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">이메일</span>
                      <span className="text-zinc-300 font-mono">{data.reviewee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">연락처</span>
                      <span className="text-zinc-300 font-mono">{data.reviewee.phone || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">생년월일</span>
                      <span className="text-zinc-300 font-mono">{data.reviewee.birthday || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">가입 경로</span>
                      <span className="text-zinc-300 font-mono uppercase">{data.reviewee.signup_method}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/users/detail?id=${data.reviewee!.id}`)}
                    className="w-full h-8 text-center text-xs border border-zinc-800 hover:border-zinc-700 bg-zinc-900 hover:bg-zinc-900/80 rounded font-semibold text-zinc-400 hover:text-zinc-200 transition-colors mt-2"
                  >
                    회원 상세 정보 보기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewDetails;
