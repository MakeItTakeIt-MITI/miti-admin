import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";

const ReportedGuests = () => {
  const router = useNavigate();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router("/");
    }
  }, [router, isLoggedIn]);
  return (
    <div className="flex h-screen  bg-[#f8f8f9]">
      <Sidebar />
      <section className="p-10 space-y-6 w-full">
        <h1 className="font-bold text-[36px]">게스트 신고 목록</h1>
      </section>
    </div>
  );
};

export default ReportedGuests;
