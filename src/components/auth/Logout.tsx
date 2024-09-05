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
      className="absolute bottom-4 text-white    w-40 h-10 rounded-lg  font-semibold text-[14px]"
    >
      로그아웃 하기
    </button>
  );
};

export default Logout;
