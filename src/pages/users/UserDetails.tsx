import { PageLayout } from "../../features/common/PageLayout";
import { useGetUserDetails } from "../../features/users/hooks/useGetUserDetails";
import { useParams } from "react-router-dom";
import { useSuspendUser } from "../../features/users/hooks/useSuspendUser";
import { useState } from "react";
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
    <PageLayout>
      <div className="   p-4 flex flex-col items-center justify-center gap-8 ">
        {" "}
        <div className="flex flex-col items-center gap-2">
          {/* <AccountCircleIcon sx={{ fontSize: 60 }} /> */}
          <img
            src={userData?.profile_image_url}
            alt="profile avatar"
            className="size-36 rounded-full"
          />
        </div>
        <hr className="h-1 w-full bg-gray-200 rounded-xl" />
        <div className="flex gap-20  w-full px-[10rem]">
          {" "}
          <h1 className="font-bold text-lg w-[8rem]">사용자 정보</h1>
          <ul className="flex flex-col gap-2">
            <li>이름 : {userData?.name} </li>
            <li>이메일 : {userData?.email} </li>
            <li>연락처 : {userData?.phone} </li>
            <li>닉네임 : {userData?.nickname} </li>
            <li>생년월일 : {userData?.birthday}</li>
          </ul>
          <ul className="space-y-2">
            <li>가입수단 : {userData?.signup_method}</li>
            <li>가입일시 : {userData?.created_at.slice(0, 10)}</li>
          </ul>
        </div>
        <hr className="h-1 w-full bg-gray-200 rounded-xl" />
        <div className="flex gap-20 w-full px-[10rem] ">
          <h1 className="font-bold text-lg w-[8rem]">플레이어 프로필</h1>
          {/* 플레이어 프로필(성별, 체중, 신장, 포지션, 역할) */}
          <ul className="flex flex-col gap-2">
            <li>성별 : {userData?.player_profile.gender} </li>
            <li>체중 : {userData?.player_profile.weight} </li>
            <li>신장 : {userData?.player_profile.height} </li>
            <li>포지션 : {userData?.player_profile.position}</li>
            <li>역할 : {userData?.player_profile.role}</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <input
          type="number"
          value={suspendDays}
          onChange={handleSuspendDays}
          placeholder="정지 기간을 입력해주세요."
          className="text-sm px-2 h-[3rem] rounded-lg w-[20rem] border border-gray-200"
        />
        <button
          className="w-[20rem] h-[3rem] bg-red-600 text-white rounded-lg hover:brightness-110 mx-auto"
          type="button"
          onClick={handleSuspendUser}
        >
          사용자 정지
        </button>
      </div>
    </PageLayout>
  );
};
