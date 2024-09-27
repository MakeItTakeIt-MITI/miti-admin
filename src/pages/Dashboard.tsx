import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const Dashboard = () => {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className="flex h-screen bg-[#f8f8f9]">
      <Sidebar />
      <section className="p-10 space-y-6 w-full">
        <h1 className="font-bold text-[36px]">Dashboard</h1>
        {/* <Chart /> */}
        <div>
          <h2>바로가기</h2>
          <div className="flex gap-2">
            <div>
              <SportsBasketballIcon />
              <h3>경기 목록</h3>
            </div>
            <div>
              <SupportAgentIcon />
              <h3>경기 목록</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
