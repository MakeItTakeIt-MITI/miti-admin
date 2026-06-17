import { useGetUserDetails } from "../../features/users/hooks/query/useGetUserDetails";
import { useSearchParams } from "react-router-dom";
import { useSuspendUser } from "../../features/users/hooks/mutation/useSuspendUser";
import { useState } from "react";
import {
  Card,
  CardTitle,
  // CardDescription,
  CardHeader,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

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

  // UI helpers (only UI additions)
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
  const badgeCls =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-700 text-gray-200 ring-1 ring-inset ring-gray-600";

  if (isLoading) {
    return (
      <section className="min-h-screen w-full flex items-center justify-center">
        <div className="text-gray-400 text-sm">불러오는 중...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-black">
      <Card className="w-[820px] min-h-[760px] bg-gray-800 text-white border border-gray-700 shadow-xl flex flex-col">
        {/* Header */}
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-8 border-b border-gray-700">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 ring-2 ring-blue-600/40">
              <AvatarImage
                src={
                  userData?.profile_image_url || "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback className="bg-gray-700 text-lg font-semibold">
                {userData?.nickname?.slice(0, 2).toUpperCase() || "NA"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                {userData?.nickname || "닉네임 없음"}
                {userData?.signup_method && (
                  <span className={badgeCls}>{userData.signup_method}</span>
                )}
              </CardTitle>
              <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                <span>
                  가입일: {userData?.created_at?.slice(0, 10) || "없음"}
                </span>
                <span>생년월일: {userData?.birthday || "없음"}</span>
                <span>사용자 ID: {userData?.id ?? "-"}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
              <Input
                type="number"
                value={suspendDays}
                onChange={handleSuspendDays}
                placeholder="정지 일수"
                min={0}
                className="h-8 w-24 bg-gray-800 border-gray-600 text-xs"
              />
              <Button
                variant="destructive"
                type="button"
                onClick={handleSuspendUser}
                className="h-8 text-xs font-semibold"
              >
                사용자 정지
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Basic Info & Player Profile */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-gray-700 bg-gray-900 p-5 space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-gray-200">
                기본 정보
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <span className="font-medium text-gray-400">이름:</span>{" "}
                  {userData?.name || "이름 없음"}
                </li>
                <li>
                  <span className="font-medium text-gray-400">이메일:</span>{" "}
                  {userData?.email || "이메일 없음"}
                </li>
                <li>
                  <span className="font-medium text-gray-400">연락처:</span>{" "}
                  {formatKoreanPhone(userData?.phone)}
                </li>
                <li>
                  <span className="font-medium text-gray-400">생년월일:</span>{" "}
                  {userData?.birthday || "없음"}
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-900 p-5 space-y-4">
              <h3 className="text-sm font-semibold tracking-wide text-gray-200">
                선수 프로필
              </h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li>
                  <span className="font-medium text-gray-400">성별:</span>{" "}
                  {userData?.player_profile?.gender || "없음"}
                </li>
                <li>
                  <span className="font-medium text-gray-400">체중:</span>{" "}
                  {userData?.player_profile?.weight || "없음"}
                </li>
                <li>
                  <span className="font-medium text-gray-400">신장:</span>{" "}
                  {userData?.player_profile?.height || "없음"}
                </li>
                <li>
                  <span className="font-medium text-gray-400">포지션:</span>{" "}
                  {userData?.player_profile?.position || "없음"}
                </li>
                <li>
                  <span className="font-medium text-gray-400">역할:</span>{" "}
                  {userData?.player_profile?.role || "없음"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
