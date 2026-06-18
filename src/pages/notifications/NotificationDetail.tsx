import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotificationDetail } from "../../features/notifications/hooks/query/useNotificationDetail";
import { useUpdateNotification } from "../../features/notifications/hooks/mutation/useUpdateNotification";
import { useDeleteNotification } from "../../features/notifications/hooks/mutation/useDeleteNotification";

const formatDate = (value: string) =>
  new Date(value).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

const NotificationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const notificationId = Number(id);

  const { data, isLoading } = useNotificationDetail(notificationId);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    if (data) {
      setForm({ title: data.title, content: data.content ?? "" });
    }
  }, [data]);

  const { mutate: update, isPending: isUpdating } = useUpdateNotification(notificationId, () => {
    setIsEditing(false);
  });

  const { mutate: remove, isPending: isDeleting } = useDeleteNotification();

  const handleDelete = () => {
    if (window.confirm("공지사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      remove(notificationId);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    update({
      title: form.title,
      content: form.content || undefined,
    });
  };

  const handleCancelEdit = () => {
    if (data) {
      setForm({ title: data.title, content: data.content ?? "" });
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
        <p className="text-zinc-400 text-sm">공지사항을 찾을 수 없습니다.</p>
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
              Admin · Notifications
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white">공지사항 상세</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/notifications?search=")}
              className="h-9 px-4 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-650 transition-colors"
            >
              목록으로
            </button>
            {!isEditing && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="h-9 px-4 rounded-lg bg-zinc-900 border border-zinc-805 text-zinc-300 text-xs font-medium hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-9 px-4 rounded-lg bg-rose-600/20 border border-rose-600/40 text-red-400 text-xs font-medium hover:bg-rose-600/30 transition-colors disabled:opacity-40"
                >
                  {isDeleting ? "삭제 중..." : "삭제"}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 px-8 py-6 max-w-3xl flex flex-col gap-5">
        {/* 기본 정보 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 flex gap-6 text-xs text-zinc-500 font-mono">
          <span>
            ID: <span className="text-zinc-300">#{data.id}</span>
          </span>
          <span>
            등록일: <span className="text-zinc-300">{formatDate(data.created_at)}</span>
          </span>
          <span>
            수정일: <span className="text-zinc-300">{formatDate(data.modified_at)}</span>
          </span>
        </div>

        {isEditing ? (
          /* 수정 모드 */
          <form onSubmit={handleUpdate} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                제목 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={48}
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
              />
              <p className="text-[10px] text-zinc-600 text-right">{form.title.length} / 48</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                내용
              </label>
              <textarea
                rows={12}
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex-1 h-9 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-650 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isUpdating || !form.title.trim()}
                className="flex-1 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isUpdating ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </form>
        ) : (
          /* 조회 모드 */
          <>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 flex flex-col gap-1.5">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                제목
              </p>
              <p className="text-base font-semibold text-white">{data.title}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 flex flex-col gap-1.5">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                내용
              </p>
              <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line min-h-[120px]">
                {data.content || <span className="text-zinc-600">내용이 없습니다.</span>}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default NotificationDetail;
