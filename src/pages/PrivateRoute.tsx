import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Navbar from "../components/common/Navbar";
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
    <div className="flex">
      <Navbar />
      <Outlet />;
    </div>
  );
}
