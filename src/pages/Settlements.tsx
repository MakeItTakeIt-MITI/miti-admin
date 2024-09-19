import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Settlements = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <section className="flex h-screen bg-[#f8f8f9]">
      <Sidebar />
      <div className="p-10 space-y-6 w-full">
        <h1 className="font-bold text-[18px] bg-white rounded-[12px] p-4">
          정산금 목록
        </h1>
        <div className="flex flex-col gap-2 font-bold text-[18px] bg-white rounded-[12px] p-4">
          <h2>신고 카테고리 검색</h2>
          <div className="flex items-center gap-2">
            <Input
              type="text"
              className="w-[50%]"
              placeholder="아이디 / 카테고리로 검색해서 찾아보세요."
            />
            <Button type="button">찾기</Button>
          </div>
        </div>

        <div className="bg-white rounded-[12px] p-4 min-h-[30rem]"></div>
      </div>
    </section>
  );
};

export default Settlements;
