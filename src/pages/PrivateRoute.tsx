import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import Navbar from "../components/common/Navbar";

export default function PrivateRoute() {
  const { logout } = useUserStore();

  if (!localStorage.getItem("accessToken")) {
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
