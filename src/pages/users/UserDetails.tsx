import { PageLayout } from "../../features/common/PageLayout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
/**
 * 
 * 렌더링 정보 : id, 이메일, 닉네임, 이름, 생년월일, 가입수단, 연락처, 프로필 이미지, 가입일시, 
 * 플레이어 프로필(성별, 체중, 신장, 포지션, 역할)
기능
회원 정지
 */
export const UserDetails = () => {
  return (
    <PageLayout>
      <div className="   p-4 flex flex-col items-center justify-center gap-8 ">
        {" "}
        <div className="flex flex-col items-center gap-2">
          <AccountCircleIcon sx={{ fontSize: 60 }} />
          (123)
        </div>
        <hr className="h-1 w-full bg-gray-200 rounded-xl" />
        <div className="flex gap-20  w-full px-[10rem]">
          {" "}
          <h1 className="font-bold text-lg w-[8rem]">사용자 정보</h1>
          <ul className="flex flex-col gap-2">
            <li>이름 : 이지원 </li>
            <li>이메일 : miti@makeittakeit.kr </li>
            <li>연락처 : 미티관리자 </li>
            <li>닉네임 : 미티관리자 </li>
            <li>생년월일 : 1996.05.19</li>
          </ul>
          <ul>
            <li>가입수단 : kakao</li>
            <li>가입일시 : 2024.12.19</li>
          </ul>
        </div>
        <hr className="h-1 w-full bg-gray-200 rounded-xl" />
        <div className="flex gap-20 w-full px-[10rem] ">
          <h1 className="font-bold text-lg w-[8rem]">플레이어 프로필</h1>
          {/* 플레이어 프로필(성별, 체중, 신장, 포지션, 역할) */}
          <ul className="flex flex-col gap-2">
            <li>성별 : 남 </li>
            <li>체중 : 78kg </li>
            <li>신장 : 182cm </li>
            <li>포지션 : 스몰포워드</li>
            <li>역할 : 가드</li>
          </ul>
        </div>
      </div>
      <button
        className="w-[20rem] h-[3rem] bg-red-600 text-white  rounded-lg  hover:brightness-110 mx-auto "
        type="button"
      >
        사용자 정지
      </button>
    </PageLayout>
  );
};
