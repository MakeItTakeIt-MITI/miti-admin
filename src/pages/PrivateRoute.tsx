import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Sidebar from "../components/common/Sidebar";
import { useEffect } from "react";

export default function PrivateRoute() {
  const { logout } = useUserStore();
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {}, [accessToken]);

  if (!accessToken) {
    logout();
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex md:space-y-0 space-y-14">
      <Sidebar />
      <Outlet />;
    </div>
  );
}
