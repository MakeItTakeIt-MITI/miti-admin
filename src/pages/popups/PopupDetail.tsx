import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePopupDetail } from "../../features/popups/hooks/query/usePopupDetail";
import { useUpdatePopup } from "../../features/popups/hooks/mutation/useUpdatePopup";
import { useDeletePopup } from "../../features/popups/hooks/mutation/useDeletePopup";
import ImageUploader from "../../components/common/ImageUploader";
import { PopupStatus } from "../../features/popups/interface/popups";

const formatDate = (value: string) =>
  new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

const PopupDetail = () => {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const popupId = Number(idParam);
  const navigate = useNavigate();

  const { data, isLoading } = usePopupDetail(popupId);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    button_text: "",
    url: "",
    status: "inactive" as PopupStatus,
    valid_until: "",
  });

  useEffect(() => {
    if (data && !isEditing) {
      setForm({
        title: data.title,
        subtitle: data.subtitle ?? "",
        image: data.image,
        button_text: data.button_text,
        url: data.url,
        status: data.status,
        valid_until: data.valid_until ?? "",
      });
    }
  }, [data, isEditing]);

  const { mutate: update, isPending: isUpdating } = useUpdatePopup(popupId, () => {
    setIsEditing(false);
  });

  const { mutate: remove, isPending: isDeleting } = useDeletePopup();

  const handleDelete = () => {
    if (window.confirm("팝업을 정말 삭제하시겠습니까? 이 작업은 복구할 수 없습니다.")) {
      remove(popupId);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    update({
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      image: form.image,
      button_text: form.button_text.trim(),
      url: form.url.trim(),
      status: form.status,
      valid_until: form.valid_until || null,
    });
  };

  const handleCancelEdit = () => {
    if (data) {
      setForm({
        title: data.title,
        subtitle: data.subtitle ?? "",
        image: data.image,
        button_text: data.button_text,
        url: data.url,
        status: data.status,
        valid_until: data.valid_until ?? "",
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
        <p className="text-zinc-400 text-sm">팝업을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 수정 모드에서 보여줄 이미지
  const editPreviewSrc = form.image;

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
              {isEditing ? "팝업 수정" : "팝업 상세 정보"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/popups")}
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
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-9 px-4 rounded-lg bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-medium hover:bg-red-600/30 transition-colors disabled:opacity-40"
                >
                  {isDeleting ? "삭제 중..." : "삭제"}
                </button>
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
          <span>
            수정일: <span className="text-zinc-300">{formatDate(data.modified_at)}</span>
          </span>
        </div>

        {isEditing ? (
          /* ======================== 수정 폼 모드 ======================== */
          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-5">
              {/* 제목 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  제목 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={64}
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-[10px] text-zinc-600 text-right">{form.title.length} / 64</p>
              </div>

              {/* 부제목 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  부제목
                </label>
                <input
                  type="text"
                  maxLength={128}
                  value={form.subtitle}
                  onChange={(e) => setForm((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <p className="text-[10px] text-zinc-600 text-right">{form.subtitle.length} / 128</p>
              </div>

              {/* 이미지 교체 */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                  팝업 이미지
                </label>
                <ImageUploader
                  category="image"
                  multiple={false}
                  value={form.image}
                  onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
                  aspectRatio="video"
                />
              </div>

              {/* 버튼 & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    버튼 문구 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={32}
                    value={form.button_text}
                    onChange={(e) => setForm((prev) => ({ ...prev, button_text: e.target.value }))}
                    className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    이동 링크 (URL) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    maxLength={256}
                    value={form.url}
                    onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
                    className="h-10 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* 상태 & 유효기간 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    팝업 활성 상태
                  </label>
                  <div className="flex items-center gap-4 h-10">
                    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="radio"
                        name="status"
                        checked={form.status === "active"}
                        onChange={() => setForm((prev) => ({ ...prev, status: "active" }))}
                        className="accent-blue-500 h-4 w-4"
                      />
                      <span>활성</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                      <input
                        type="radio"
                        name="status"
                        checked={form.status === "inactive"}
                        onChange={() => setForm((prev) => ({ ...prev, status: "inactive" }))}
                        className="accent-blue-500 h-4 w-4"
                      />
                      <span>비활성</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                    유효기간
                  </label>
                  <input
                    type="date"
                    value={form.valid_until}
                    onChange={(e) => setForm((prev) => ({ ...prev, valid_until: e.target.value }))}
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
                    !form.image ||
                    !form.url.trim() ||
                    !form.button_text.trim()
                  }
                  className="flex-1 h-10 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "저장 중..." : "저장하기"}
                </button>
              </div>
            </div>

            {/* 수정 모드 이미지 미리보기 */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                이미지 미리보기
              </p>
              <div className="w-full aspect-[4/3] rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden p-4">
                {editPreviewSrc ? (
                  <img
                    src={editPreviewSrc}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded border border-zinc-800"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240' viewBox='0 0 320 240'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='14'>Image Load Failed</text></svg>";
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
                  제목
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

              {/* 링크 정보 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    버튼 문구
                  </p>
                  <p className="text-sm text-zinc-200 font-semibold">{data.button_text}</p>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5 overflow-hidden">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    이동 링크
                  </p>
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline truncate"
                  >
                    {data.url}
                  </a>
                </div>
              </div>

              {/* 상태 및 기간 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    노출 상태
                  </p>
                  <div>
                    {data.status === "active" ? (
                      <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        활성 (사용자에게 노출됨)
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                        비활성 (미노출)
                      </span>
                    )}
                  </div>
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1.5">
                  <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                    노출 유효기간
                  </p>
                  <p className="text-sm text-zinc-200 font-mono">
                    {data.valid_until ? `${data.valid_until} 까지` : "제한 없음"}
                  </p>
                </div>
              </div>
            </div>

            {/* 조회 모드 이미지 미리보기 카드 */}
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
                팝업 이미지
              </p>
              <div className="w-full aspect-[4/3] rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center overflow-hidden p-3 shadow-md">
                <img
                  src={data.image}
                  alt={data.title}
                  className="max-w-full max-h-full object-contain rounded border border-zinc-800"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240' viewBox='0 0 320 240'><rect width='100%' height='100%' fill='%2318181b'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='sans-serif' font-size='14'>Image Load Failed</text></svg>";
                  }}
                />
              </div>
              <a
                href={data.image}
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

export default PopupDetail;
