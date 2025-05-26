import { useGetUserDetails } from "../../features/users/hooks/useGetUserDetails";
import { useSearchParams } from "react-router-dom";
import { useSuspendUser } from "../../features/users/hooks/useSuspendUser";
import { useState } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
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

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <section className="min-h-screen w-full flex items-center justify-center ">
      <Card className="w-[500px] h-[800px] bg-gray-800 text-white">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar>
            <AvatarImage
              src={
                userData?.profile_image_url || "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>
              {userData?.nickname?.slice(0, 2).toUpperCase() || "NA"}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-4xl font-bold">
            {userData?.nickname || "닉네임 없음"}
          </CardTitle>
          <CardDescription className="text-md text-white flex flex-col  gap-8">
            <div className="flex flex-col gap-2">
              <span>이름: {userData?.name || "이름 없음"}</span>
              <span>이메일: {userData?.email || "이메일 없음"}</span>
              <span>연락처: {userData?.phone || "연락처 없음"}</span>
              <span>생년월일: {userData?.birthday || "생년월일 없음"}</span>
              <span>
                가입수단: {userData?.signup_method || "가입수단 없음"}
              </span>
              <span>
                가입일시:{" "}
                {userData?.created_at?.slice(0, 10) || "가입일시 없음"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span>성별: {userData?.player_profile?.gender || "없음"}</span>
              <span>체중: {userData?.player_profile?.weight || "없음"}</span>
              <span>신장: {userData?.player_profile?.height || "없음"}</span>
              <span>
                포지션: {userData?.player_profile?.position || "없음"}
              </span>
              <span>역할: {userData?.player_profile?.role || "역할 없음"}</span>
            </div>
          </CardDescription>
        </CardHeader>

        <div className="flex items-center justify-center gap-4 w-[400px] mx-auto">
          <Input
            type="number"
            value={suspendDays}
            onChange={handleSuspendDays}
            placeholder="Email"
            min={0}
          />
          <Button
            variant={"destructive"}
            type="button"
            onClick={handleSuspendUser}
          >
            {" "}
            사용자 정지
          </Button>
        </div>
      </Card>
    </section>
  );
};
