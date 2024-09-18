import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const Logout = () => {
  const { logout } = useUserStore();

  const router = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        logout();
        router("/");
      }}
      className="hover:opacity-90 text-[12px]  text-white    w-40 h-10 rounded-lg  font-semibold"
    >
      로그아웃
    </button>
  );
};

export default Logout;
