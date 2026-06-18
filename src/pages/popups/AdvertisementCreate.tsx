import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateAdvertisement } from "../../features/advertisements/hooks/mutation/useCreateAdvertisement";
import ImageUploader from "../../components/common/ImageUploader";
import { AdvertisementStatus } from "../../features/advertisements/interface/advertisements";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/image";

const AdvertisementCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    thumbnail_image_path: "", // 상대 경로로 저장됨
    advertisement_status: "active" as AdvertisementStatus,
    expire_at: "",
    dataStr: "{}", // JSON input을 관리하기 위한 string state
  });

  const { mutate, isPending } = useCreateAdvertisement(() => {
    // Navigate back to listing page with advertisement tab active
    navigate("/popups?tab=advertisement");
  });

  const handleSubmit = (e: React.FormEvent) => {
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

    mutate({
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      content: form.content.trim(),
      thumbnail_image_path: form.thumbnail_image_path,
      advertisement_status: form.advertisement_status,
      expire_at: form.expire_at || null,
      data: parsedData,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Admin · Marketing
            </p>
            <h1 className="text-2xl font-bold tracking-tight">광고 등록</h1>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-9 px-4 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-600 transition-colors"
          >
            뒤로가기
          </button>
        </div>
      </header>

      {/* 폼 메인 */}
      <main className="flex-1 px-8 py-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 입력 필드 영역 */}
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
                placeholder="광고 제목을 입력하세요 (최대 32자)"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                placeholder="광고 부제목을 입력하세요 (최대 32자)"
                value={form.subtitle}
                onChange={(e) => setForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
                placeholder="광고 상세 내용을 입력하세요"
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                rows={4}
                className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* 썸네일 이미지 업로드 */}
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
              <p className="text-[10px] text-zinc-500">
                이미지 업로드 완료 시 미리보기 주소(URL) 정보가 저장됩니다.
              </p>
            </div>

            {/* 추가 데이터 (JSON) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                추가 JSON 데이터 (선택)
              </label>
              <textarea
                placeholder='{"coupon_id": 42}'
                value={form.dataStr}
                onChange={(e) => setForm((prev) => ({ ...prev, dataStr: e.target.value }))}
                rows={4}
                className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 text-sm placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono resize-none"
              />
              <p className="text-[10px] text-zinc-500">
                쿠폰 ID 등 광고 관련 메타데이터를 JSON 객체 형식으로 입력합니다.
              </p>
            </div>

            {/* 광고 상태 & 만료일 */}
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
                  만료일 (선택)
                </label>
                <input
                  type="date"
                  value={form.expire_at}
                  onChange={(e) => setForm((prev) => ({ ...prev, expire_at: e.target.value }))}
                  className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            {/* 동작 버튼 */}
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 h-10 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:bg-zinc-900 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={
                  isPending ||
                  !form.title.trim() ||
                  !form.content.trim() ||
                  !form.thumbnail_image_path
                }
                className="flex-1 h-10 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isPending ? "등록 중..." : "등록하기"}
              </button>
            </div>
          </div>

          {/* 이미지 미리보기 영역 */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              썸네일 미리보기
            </p>
            <div className="w-full aspect-[4/3] rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden p-4">
              {form.thumbnail_image_path ? (
                <img
                  src={getImageUrl(form.thumbnail_image_path)}
                  alt="Thumbnail preview"
                  className="max-w-full max-h-full object-contain rounded border border-zinc-800"
                />
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto w-10 h-10 text-zinc-700 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-zinc-600 text-xs">
                    썸네일 이미지를 업로드하면 여기에 나타납니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdvertisementCreate;
