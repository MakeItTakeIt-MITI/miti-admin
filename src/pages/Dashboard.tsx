import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();

  const userSessionStorage = sessionStorage.getItem("accessToken");

  const today = new Date();
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }

    if (!userSessionStorage) {
      logout();
    }
  }, [navigate, isLoggedIn, logout, userSessionStorage]);

  return (
    <section className="min-h-screen bg-[#e6e5e5] pt-[6rem] py-[4rem]">
      <div className="max-w-[52rem]  mx-auto space-y-4 ">
        <h1 className="font-bold text-3xl">{formattedDate}</h1>
        {/* top */}
        <div className="flex gap-4 ">
          <div className="bg-[#fdfdfd] w-[15rem] h-[6rem] rounded-xl p-3 flex flex-col justify-between drop-shadow-sm">
            <h2 className="text-green-500  font-[500] text-lg">14</h2>
            <h3 className="text-md font-bold">모집 중인 경기</h3>
          </div>
          <div className="bg-[#fdfdfd] w-[15rem] h-[6rem] rounded-xl p-3 flex flex-col justify-between drop-shadow-sm">
            <h2 className="text-blue-500  font-[500] text-lg">14</h2>
            <h3 className="text-md font-bold">완료된 경기</h3>
          </div>
          <div className="bg-[#fdfdfd] w-[15rem] h-[6rem] rounded-xl p-3 flex flex-col justify-between drop-shadow-sm">
            <h2 className="text-red-500  font-[500] text-lg">14</h2>
            <h3 className="text-md font-bold">취소된 경기</h3>
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="bg-[#fdfdfd] w-[15rem] h-[6rem] rounded-xl p-3 flex flex-col justify-between drop-shadow-sm">
            <h2 className="text-green-500  font-[500] text-lg">14</h2>
            <h3 className="text-md font-bold">신규 회원</h3>
          </div>
          <div className="bg-[#fdfdfd] w-[15rem] h-[6rem] rounded-xl p-3 flex flex-col justify-between drop-shadow-sm">
            <h2 className="text-blue-500  font-[500] text-lg">14</h2>
            <h3 className="text-md font-bold">전체 회원</h3>
          </div>
        </div>
        {/* middle */}
        <div className="w-full h-[28rem] bg-[#fdfdfd] rounded-xl p-3 border-[4px] border-t-blue-400 drop-shadow-sm">
          <h2 className=" font-bold text-lg">오늘 경기</h2>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
