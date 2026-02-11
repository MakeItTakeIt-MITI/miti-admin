import { useGetUserDetails } from "../../features/users/hooks/query/useGetUserDetails";
import { useSearchParams, Link } from "react-router-dom";
import { useSuspendUser } from "../../features/users/hooks/mutation/useSuspendUser";
import { useState } from "react";

const formatKoreanPhone = (phone?: string) => {
  if (!phone) return "연락처 없음";
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("82")) digits = "0" + digits.slice(2);
  if (digits.length === 11)
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
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
      alert("정지 기간을 입력해주세요.");
      return;
    }
    mutate();
  };

  const userData = data?.data;

  if (isLoading) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center bg-gray-950">
        <div className="text-gray-400 text-sm">불러오는 중...</div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center bg-gray-950">
        <div className="text-gray-400 text-sm">
          사용자 정보를 찾을 수 없습니다.
        </div>
      </section>
    );
  }

  return (
    <section className="w-full p-8 bg-gray-950">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">사용자 상세 정보</h1>
          <Link
            to="/users"
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            목록으로
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
          {/* Profile Header */}
          <div className="p-8 border-b border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={
                      userData.profile_image_url ||
                      "https://via.placeholder.com/80"
                    }
                    alt={userData.nickname || "User"}
                    className="h-20 w-20 rounded-full ring-2 ring-blue-600/40 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/80";
                    }}
                  />
                </div>

                {/* User Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-white">
                      {userData.nickname || "닉네임 없음"}
                    </h2>
                    {userData.signup_method && (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-700 text-gray-200 ring-1 ring-inset ring-gray-600">
                        {userData.signup_method}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                    <span>
                      가입일: {userData.created_at?.slice(0, 10) || "없음"}
                    </span>
                    <span>•</span>
                    <span>생년월일: {userData.birthday || "없음"}</span>
                    <span>•</span>
                    <span>ID: {userData.id ?? "-"}</span>
                  </div>
                </div>
              </div>

              {/* Suspend User Section */}
              <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-3 py-2">
                <input
                  type="number"
                  value={suspendDays}
                  onChange={handleSuspendDays}
                  placeholder="정지 일수"
                  min={0}
                  className="h-8 w-24 bg-gray-900 border border-gray-700 rounded px-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={handleSuspendUser}
                  className="h-8 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  사용자 정지
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Basic Info */}
              <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-gray-200">
                  기본 정보
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">이름</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.name || "이름 없음"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">이메일</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.email || "이메일 없음"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">연락처</dt>
                    <dd className="text-gray-200 font-medium">
                      {formatKoreanPhone(userData.phone)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">생년월일</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.birthday || "없음"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Player Profile */}
              <div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 space-y-4">
                <h3 className="text-sm font-semibold tracking-wide text-gray-200">
                  선수 프로필
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">성별</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.player_profile?.gender || "없음"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">체중</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.player_profile?.weight
                        ? `${userData.player_profile.weight} kg`
                        : "없음"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">신장</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.player_profile?.height
                        ? `${userData.player_profile.height} cm`
                        : "없음"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">포지션</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.player_profile?.position || "없음"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">역할</dt>
                    <dd className="text-gray-200 font-medium">
                      {userData.player_profile?.role || "없음"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
