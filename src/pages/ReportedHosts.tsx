import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Sidebar from "../components/Sidebar";

const ReportedHosts = () => {
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
        <h1 className="font-bold text-[36px]">호스트 신고 목록</h1>
      </section>
    </div>
  );
};

export default ReportedHosts;
