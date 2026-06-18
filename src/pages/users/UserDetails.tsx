import { useGetUserDetails } from "../../features/users/hooks/query/useGetUserDetails";
import { useSearchParams, Link } from "react-router-dom";
import { useSuspendUser } from "../../features/users/hooks/mutation/useSuspendUser";
import { useState } from "react";
import { toast } from "react-toastify";

const formatKoreanPhone = (phone?: string) => {
  if (!phone) return "연락처 없음";
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("82")) digits = "0" + digits.slice(2);
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return phone;
};

export const UserDetails = () => {
  const [suspendDays, setSuspendDays] = useState(0);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  const { data, isLoading } = useGetUserDetails(Number(userId));
  const { mutate } = useSuspendUser(Number(userId), suspendDays);

  const handleSuspendDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuspendDays(Number(e.target.value));
  };

  const handleSuspendUser = () => {
    if (suspendDays <= 0) {
      toast.warning("정지 기간을 입력해주세요.");
      return;
    }
    if (window.confirm(`이 회원을 ${suspendDays}일 동안 이용 정지 처리하시겠습니까?`)) {
      mutate();
    }
  };

  const userData = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-zinc-400 text-sm">불러오는 중...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <p className="text-zinc-400 text-sm">사용자 정보를 찾을 수 없습니다.</p>
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
              Admin · User
            </p>
            <h1 className="text-2xl font-bold tracking-tight">회원 상세 정보</h1>
          </div>
          <Link
            to="/users"
            className="h-9 px-4 flex items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 text-xs font-medium hover:text-white hover:border-zinc-600 transition-colors"
          >
            목록으로
          </Link>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-8 py-6 max-w-5xl space-y-6">
        {/* 회원 정보 헤더 카드 */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* 프로필 이미지 */}
            <div className="relative">
              <img
                src={userData.profile_image_url || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='100%' height='100%' fill='%2327272a'/><path d='M40 18a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-24 44c0-10 16-12 24-12s24 2 24 12v4H16v-4z' fill='%2371717a'/></svg>"}
                alt={userData.nickname || "User"}
                className="h-20 w-20 rounded-full ring-2 ring-blue-500/20 object-cover bg-zinc-900 border border-zinc-800"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='100%' height='100%' fill='%2327272a'/><path d='M40 18a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-24 44c0-10 16-12 24-12s24 2 24 12v4H16v-4z' fill='%2371717a'/></svg>";
                }}
              />
            </div>

            {/* 기본 텍스트 정보 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {userData.nickname || "닉네임 없음"}
                </h2>
                {userData.signup_method && (
                  <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                    {userData.signup_method}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 font-mono">
                <span>
                  ID: <span className="text-zinc-300">{userData.id ?? "-"}</span>
                </span>
                <span>•</span>
                <span>
                  가입일:{" "}
                  <span className="text-zinc-300">
                    {userData.created_at?.slice(0, 10) || "없음"}
                  </span>
                </span>
                <span>•</span>
                <span>
                  생년월일: <span className="text-zinc-300">{userData.birthday || "없음"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* 이용 정지 처리 카드 */}
          <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-3">
            <input
              type="number"
              value={suspendDays}
              onChange={handleSuspendDays}
              placeholder="정지 일수"
              min={0}
              className="h-8 w-24 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500 transition-colors"
            />
            <button
              type="button"
              onClick={handleSuspendUser}
              className="h-8 px-4 bg-rose-600/20 border border-rose-600/40 text-red-400 rounded-lg text-xs font-medium hover:bg-rose-600/30 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              회원 정지
            </button>
          </div>
        </div>

        {/* 상세 서브 정보 세부 내역 */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* 기본 인적 사항 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-200 border-b border-zinc-800/80 pb-3">
              기본 가입 정보
            </h3>
            <dl className="space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">실명</dt>
                <dd className="text-zinc-200">{userData.name || "—"}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">이메일 계정</dt>
                <dd className="text-zinc-200 font-mono">{userData.email || "—"}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">연락처</dt>
                <dd className="text-zinc-200 font-mono">{formatKoreanPhone(userData.phone)}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">생년월일</dt>
                <dd className="text-zinc-200 font-mono">{userData.birthday || "—"}</dd>
              </div>
            </dl>
          </div>

          {/* 선수/플레이어 프로필 */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
            <h3 className="text-sm font-semibold tracking-wide text-zinc-200 border-b border-zinc-800/80 pb-3">
              선수 프로필
            </h3>
            <dl className="space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">성별</dt>
                <dd className="text-zinc-200">{userData.player_profile?.gender || "—"}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">체중 (Weight)</dt>
                <dd className="text-zinc-200 font-mono">
                  {userData.player_profile?.weight ? `${userData.player_profile.weight} kg` : "—"}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">신장 (Height)</dt>
                <dd className="text-zinc-200 font-mono">
                  {userData.player_profile?.height ? `${userData.player_profile.height} cm` : "—"}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">포지션</dt>
                <dd className="text-zinc-200">{userData.player_profile?.position || "—"}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-zinc-500">주요 역할</dt>
                <dd className="text-zinc-200">{userData.player_profile?.role || "—"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
};
