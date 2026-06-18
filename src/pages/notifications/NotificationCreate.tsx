import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateNotification } from "../../features/notifications/hooks/mutation/useCreateNotification";

const NotificationCreate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  const { mutate, isPending } = useCreateNotification(() => {
    navigate("/notifications?search=");
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      title: form.title,
      content: form.content || undefined,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* 페이지 헤더 */}
      <header className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Admin · Notifications
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white">공지사항 작성</h1>
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

      <main className="flex-1 px-8 py-6">
        <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
          {/* 제목 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              제목 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              maxLength={48}
              placeholder="공지사항 제목을 입력하세요 (최대 48자)"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="h-9 rounded-lg bg-zinc-900 border border-zinc-800 px-3 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors"
            />
            <p className="text-[10px] text-zinc-600 text-right">{form.title.length} / 48</p>
          </div>

          {/* 내용 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
              내용
            </label>
            <textarea
              rows={10}
              placeholder="공지사항 내용을 입력하세요"
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              className="rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2.5 text-sm text-white placeholder:text-zinc-650 focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:border-zinc-700 transition-colors resize-none"
            />
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 h-9 rounded-lg border border-zinc-700 text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-650 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isPending || !form.title.trim()}
              className="flex-1 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NotificationCreate;
