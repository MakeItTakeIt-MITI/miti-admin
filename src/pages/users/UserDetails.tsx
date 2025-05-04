import { useGetUserDetails } from "../../features/users/hooks/useGetUserDetails";
import { useParams } from "react-router-dom";
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
/**
 * 
 * 렌더링 정보 : id, 이메일, 닉네임, 이름, 생년월일, 가입수단, 연락처, 프로필 이미지, 가입일시, 
 * 플레이어 프로필(성별, 체중, 신장, 포지션, 역할)
기능
회원 정지
 */
export const UserDetails = () => {
  const [suspendDays, setSuspendDays] = useState(0);
  const { userId } = useParams();

  const { data } = useGetUserDetails(Number(userId));
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
  return (
    <section className="min-h-screen flex-items-center justify-center ">
      <Card className="border-none">
        <CardHeader className="flex flex-col items-center gap-4">
          <Avatar className="size-[80px]">
            <AvatarImage
              src={
                userData?.profile_image_url || "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>
              {userData?.nickname?.slice(0, 2).toUpperCase() || "NA"}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-xl font-bold">
            {userData?.nickname || "닉네임 없음"}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 flex flex-col  gap-8">
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

        {/* <div className="flex gap-4 items-center justify-center">
          <input
            type="number"
            value={suspendDays}
            onChange={handleSuspendDays}
            placeholder="정지 기간을 입력해주세요."
            className="text-sm px-2 h-[3rem] rounded-lg w-[20rem] border border-gray-200"
          />
          <Button
            variant={"destructive"}
            type="button"
            onClick={handleSuspendUser}
          >
            사용자 정지
          </Button>
        </div> */}
      </Card>
    </section>
    // <PageLayout>

    //   <div className="   p-4 flex flex-col items-center justify-center gap-8 ">
    //     {" "}
    //     <div className="flex flex-col items-center gap-2">
    //       {/* <AccountCircleIcon sx={{ fontSize: 60 }} /> */}
    //       <img
    //         src={userData?.profile_image_url}
    //         alt="profile avatar"
    //         className="size-36 rounded-full"
    //       />
    //     </div>
    //     <hr className="h-1 w-full bg-gray-200 rounded-xl" />
    //     <div className="flex gap-20  w-full px-[10rem]">
    //       {" "}
    //       <h1 className="font-bold text-lg w-[8rem]">사용자 정보</h1>
    //       <ul className="flex flex-col gap-2">
    //         <li>이름 : {userData?.name} </li>
    //         <li>이메일 : {userData?.email} </li>
    //         <li>연락처 : {userData?.phone} </li>
    //         <li>닉네임 : {userData?.nickname} </li>
    //         <li>생년월일 : {userData?.birthday}</li>
    //       </ul>
    //       <ul className="space-y-2">
    //         <li>가입수단 : {userData?.signup_method}</li>
    //         <li>가입일시 : {userData?.created_at.slice(0, 10)}</li>
    //       </ul>
    //     </div>
    //     <hr className="h-1 w-full bg-gray-200 rounded-xl" />
    //     <div className="flex gap-20 w-full px-[10rem] ">
    //       <h1 className="font-bold text-lg w-[8rem]">플레이어 프로필</h1>
    //       {/* 플레이어 프로필(성별, 체중, 신장, 포지션, 역할) */}
    //       <ul className="flex flex-col gap-2">
    //         <li>성별 : {userData?.player_profile.gender} </li>
    //         <li>체중 : {userData?.player_profile.weight} </li>
    //         <li>신장 : {userData?.player_profile.height} </li>
    //         <li>포지션 : {userData?.player_profile.position}</li>
    //         <li>역할 : {userData?.player_profile.role}</li>
    //       </ul>
    //     </div>
    //   </div>
    //   <div className="flex flex-col gap-4 items-center justify-center">
    //     <input
    //       type="number"
    //       value={suspendDays}
    //       onChange={handleSuspendDays}
    //       placeholder="정지 기간을 입력해주세요."
    //       className="text-sm px-2 h-[3rem] rounded-lg w-[20rem] border border-gray-200"
    //     />
    //     <button
    //       className="w-[20rem] h-[3rem] bg-red-600 text-white rounded-lg hover:brightness-110 mx-auto"
    //       type="button"
    //       onClick={handleSuspendUser}
    //     >
    //       사용자 정지
    //     </button>
    //   </div>
    // </PageLayout>
  );
};
