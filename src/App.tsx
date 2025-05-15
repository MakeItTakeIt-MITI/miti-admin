import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";

function App() {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div className="flex">
      {isLoggedIn && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;
