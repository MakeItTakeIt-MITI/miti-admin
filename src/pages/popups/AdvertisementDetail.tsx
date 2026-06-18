import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAdvertisementDetail } from "../../features/advertisements/hooks/query/useAdvertisementDetail";
import { useUpdateAdvertisement } from "../../features/advertisements/hooks/mutation/useUpdateAdvertisement";
import { useDeactivateAdvertisement } from "../../features/advertisements/hooks/mutation/useDeactivateAdvertisement";
import ImageUploader from "../../components/common/ImageUploader";
import { AdvertisementStatus } from "../../features/advertisements/interface/advertisements";
import { toast } from "react-toastify";
import { getImageUrl, FALLBACK_IMAGE } from "../../utils/image";

const formatDate = (value: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
};

const AdvertisementDetail = () => {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const adId = Number(idParam);
  const navigate = useNavigate();

  const { data, isLoading } = useAdvertisementDetail(adId);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    thumbnail_image_path: "",
    advertisement_status: "active" as AdvertisementStatus,
    expire_at: "",
    dataStr: "{}",
  });

  useEffect(() => {
    if (data && !isEditing) {
      setForm({
        title: data.title,
        subtitle: data.subtitle ?? "",
        content: data.content,
        thumbnail_image_path: data.thumbnail_image_path,
        advertisement_status: data.advertisement_status,
        expire_at: data.expire_at ?? "",
        dataStr: JSON.stringify(data.data ?? {}, null, 2),
      });
    }
  }, [data, isEditing]);

  const { mutate: update, isPending: isUpdating } = useUpdateAdvertisement(adId, () => {
    setIsEditing(false);
  });

  const { mutate: deactivate, isPending: isDeactivating } = useDeactivateAdvertisement();

  const handleDeactivate = () => {
    if (
      window.confirm(
        "광고를 정말 비활성화(만료) 처리하시겠습니까? 이 작업은 사용자에게 즉시 미노출 상태로 변경합니다.",
      )
    ) {
      deactivate(adId);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.thumbnail_image_path) {
      toast.warning("썸네일 이미지를 업로드해주세요.");
      return;
    }

    let parsedData = null;
    try {
      if (form.dataStr.trim()) {
        parsedData = JSON.parse(form.dataStr);
        if (typeof parsedData !== "object" || parsedData === null) {
          throw new Error("JSON 객체 또는 배열 형태여야 합니다.");
        }
      }
    } catch (error) {
      toast.error("추가 데이터 JSON 형식이 올바르지 않습니다.");
      return;
    }

    update({
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      content: form.content.trim(),
      thumbnail_image_path: form.thumbnail_image_path,
      advertisement_status: form.advertisement_status,
      expire_at: form.expire_at || null,
      data: parsedData,
    });
  };

  const handleCancelEdit = () => {
    if (data) {
      setForm({
        title: data.title,
        subtitle: data.subtitle ?? "",
        content: data.content,
        thumbnail_image_path: data.thumbnail_image_path,
        advertisement_status: data.advertisement_status,
        expire_at: data.expire_at ?? "",
        dataStr: JSON.stringify(data.data ?? {}, null, 2),
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-zinc-400 text-sm">불러오는 중...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-zinc-400 text-sm">광고를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Admin · Marketing
            </p>
            <h1 className="text-2xl font-bold tracking-tight">
              {isEditing ? "광고 수정" : "광고 상세 정보"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/popups?tab=advertisement")}
              className="h-9 px-4 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-600 transition-colors"
            >
              목록으로
            </button>
            {!isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="h-9 px-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors border border-zinc-700"
                >
                  수정
                </button>
                {data.advertisement_status === "active" && (
                  <button
                    type="button"
                    onClick={handleDeactivate}
                    disabled={isDeactivating}
                    className="h-9 px-4 rounded-lg bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-medium hover:bg-red-600/30 transition-colors disabled:opacity-40"
                  >
                    {isDeactivating ? "처리 중..." : "비활성화 (만료)"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-8 py-6 max-w-4xl">
        {/* 메타 정보 */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-5 py-3.5 mb-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-zinc-500 font-mono">
          <span>
            ID: <span className="text-zinc-300">{data.id}</span>
          </span>
          <span>
            등록일: <span className="text-zinc-300">{formatDate(data.created_at)}</span>
          </span>
        </div>

        {isEditing ? (
          /* ======================== 수정 폼 모드 ======================== */
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-5">
              {/* 제목 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  광고 제목 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={32}
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-[10px] text-zinc-600 text-right">{form.title.length} / 32</p>
              </div>

              {/* 부제목 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  부제목 (선택)
                </label>
                <input
                  type="text"
                  maxLength={32}
                  value={form.subtitle}
                  onChange={(e) => setForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-[10px] text-zinc-600 text-right">{form.subtitle.length} / 32</p>
              </div>

              {/* 광고 내용 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  광고 내용 <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* 이미지 교체 */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  썸네일 이미지 <span className="text-red-400">*</span>
                </label>
                <ImageUploader
                  category="image"
                  multiple={false}
                  value={getImageUrl(form.thumbnail_image_path)}
                  onChange={(url) =>
                    setForm((prev) => ({ ...prev, thumbnail_image_path: url }))
                  }
                  aspectRatio="video"
                />
              </div>

              {/* 추가 데이터 (JSON) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  추가 JSON 데이터 (선택)
                </label>
                <textarea
                  value={form.dataStr}
                  onChange={(e) => setForm((prev) => ({ ...prev, dataStr: e.target.value }))}
                  rows={4}
                  className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono resize-none"
                  placeholder='{"coupon_id": 42}'
                />
              </div>

              {/* 상태 & 만료일 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    광고 상태
                  </label>
                  <div className="flex items-center gap-4 h-10">
                    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="radio"
                        name="advertisement_status"
                        checked={form.advertisement_status === "active"}
                        onChange={() =>
                          setForm((prev) => ({ ...prev, advertisement_status: "active" }))
                        }
                        className="accent-blue-500 h-4 w-4"
                      />
                      <span>활성</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="radio"
                        name="advertisement_status"
                        checked={form.advertisement_status === "expired"}
                        onChange={() =>
                          setForm((prev) => ({ ...prev, advertisement_status: "expired" }))
                        }
                        className="accent-blue-500 h-4 w-4"
                      />
                      <span>만료</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    만료일
                  </label>
                  <input
                    type="date"
                    value={form.expire_at}
                    onChange={(e) => setForm((prev) => ({ ...prev, expire_at: e.target.value }))}
                    className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* 폼 버튼 */}
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 h-10 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={
                    isUpdating ||
                    !form.title.trim() ||
                    !form.content.trim() ||
                    !form.thumbnail_image_path
                  }
                  className="flex-1 h-10 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "저장 중..." : "저장하기"}
                </button>
              </div>
            </div>

            {/* 이미지 미리보기 */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                썸네일 미리보기
              </p>
              <div className="w-full aspect-[4/3] rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden p-4">
                {form.thumbnail_image_path ? (
                  <img
                    src={getImageUrl(form.thumbnail_image_path)}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded border border-zinc-800"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                ) : (
                  <span className="text-zinc-600 text-xs">이미지가 없습니다.</span>
                )}
              </div>
            </div>
          </form>
        ) : (
          /* ======================== 상세 조회 모드 ======================== */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-5">
              {/* 제목 */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  광고 제목
                </p>
                <p className="text-base font-semibold text-white">{data.title}</p>
              </div>

              {/* 부제목 */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  부제목
                </p>
                <p className="text-sm text-zinc-200">
                  {data.subtitle || (
                    <span className="text-zinc-600">등록된 부제목이 없습니다.</span>
                  )}
                </p>
              </div>

              {/* 광고 내용 */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  광고 내용
                </p>
                <p className="text-sm text-zinc-200 whitespace-pre-line leading-relaxed">
                  {data.content}
                </p>
              </div>

              {/* 상태 및 기간 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    노출 상태
                  </p>
                  <div>
                    {data.advertisement_status === "active" ? (
                      <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        활성 (사용자에게 노출됨)
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                        만료 (미노출)
                      </span>
                    )}
                  </div>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    만료일
                  </p>
                  <p className="text-sm text-zinc-200 font-mono">
                    {data.expire_at ? `${data.expire_at} 까지` : "제한 없음"}
                  </p>
                </div>
              </div>

              {/* 추가 데이터 (JSON) */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                  추가 메타데이터 (JSON)
                </p>
                {data.data && Object.keys(data.data).length > 0 ? (
                  <pre className="text-xs bg-black p-3.5 rounded border border-zinc-800 text-blue-400 overflow-x-auto font-mono">
                    {JSON.stringify(data.data, null, 2)}
                  </pre>
                ) : (
                  <p className="text-sm text-zinc-600 italic">추가 데이터가 없습니다.</p>
                )}
              </div>
            </div>

            {/* 조회 모드 이미지 미리보기 카드 */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                썸네일 이미지
              </p>
              <div className="w-full aspect-[4/3] rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden p-3 shadow-md">
                <img
                  src={getImageUrl(data.thumbnail_image_path)}
                  alt={data.title}
                  className="max-w-full max-h-full object-contain rounded border border-zinc-800"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
              </div>
              <a
                href={getImageUrl(data.thumbnail_image_path)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-zinc-500 hover:text-zinc-300 hover:underline text-center font-mono break-all"
              >
                원본 이미지 주소 열기
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdvertisementDetail;
