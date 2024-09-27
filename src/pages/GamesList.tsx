import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const GamesList = () => {
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
        <h1 className="font-bold text-[36px]">GamesList</h1>
        {/* <Chart /> */}
      </section>
    </div>
  );
};

export default GamesList;
