import { useGetUserDetails } from "../../features/users/hooks/query/useGetUserDetails";
import { Link, useSearchParams } from "react-router-dom";
import { useSuspendUser } from "../../features/users/hooks/mutation/useSuspendUser";
import { useState } from "react";

import { Spinner } from "../../features/common/Spinner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

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

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value || "N/A"}</span>
  </div>
);

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

  const badgeCls =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-700 text-gray-200 ring-1 ring-inset ring-gray-600";

  if (isLoading) {
    return (
      <section className="w-full h-full flex items-center justify-center p-8">
        <Spinner className="h-10 w-10" />
      </section>
    );
  }

  if (!userData) {
    return (
      <section className="w-full p-8 text-center text-muted-foreground">
        사용자 정보를 찾을 수 없습니다.
      </section>
    );
  }

  return (
    <section className="w-full p-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">사용자 상세 정보</h1>
        <Button variant="outline" asChild>
          <Link to="/users">목록으로</Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start gap-6 p-6">
          <Avatar className="h-24 w-24 border">
            <AvatarImage src={userData.profile_image_url || ""} />
            <AvatarFallback className="text-2xl">
              {userData.nickname?.slice(0, 2).toUpperCase() || "NA"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-2xl">{userData.nickname}</CardTitle>
            <CardDescription>{userData.email}</CardDescription>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <Badge variant="secondary">{userData.signup_method}</Badge>
              <Badge variant="outline">
                가입일: {userData.created_at?.slice(0, 10)}
              </Badge>
              <Badge variant="outline">ID: {userData.id}</Badge>
            </div>
          </div>
          {/* --- Suspend User Dialog --- */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">사용자 정지</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>사용자를 정지하시겠습니까?</DialogTitle>
                <DialogDescription>
                  정지할 일 수를 입력하고 확인 버튼을 누르세요. 이 작업은 되돌릴
                  수 없습니다.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  id="suspendDays"
                  type="number"
                  value={suspendDays}
                  onChange={(e) => setSuspendDays(Number(e.target.value))}
                  placeholder="정지 일수 (예: 7)"
                  min={1}
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleSuspendUser}
                  disabled={suspendDays <= 0}
                >
                  정지 확인
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="p-6 pt-0 grid md:grid-cols-2 gap-6">
          {/* --- Basic Info Card --- */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="이름" value={userData.name} />
              <InfoRow
                label="연락처"
                value={formatKoreanPhone(userData.phone)}
              />
              <InfoRow label="생년월일" value={userData.birthday} />
            </CardContent>
          </Card>

          {/* --- Player Profile Card --- */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">선수 프로필</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <InfoRow label="성별" value={userData.player_profile?.gender} />
              <InfoRow
                label="신장"
                value={
                  userData.player_profile?.height
                    ? `${userData.player_profile.height} cm`
                    : null
                }
              />
              <InfoRow
                label="체중"
                value={
                  userData.player_profile?.weight
                    ? `${userData.player_profile.weight} kg`
                    : null
                }
              />
              <InfoRow
                label="포지션"
                value={userData.player_profile?.position}
              />
              <InfoRow label="주 역할" value={userData.player_profile?.role} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
};
