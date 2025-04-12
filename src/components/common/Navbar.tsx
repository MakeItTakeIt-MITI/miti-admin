// import MenuIcon from "@mui/icons-material/Menu";

import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentIcon from "@mui/icons-material/Payment";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const Navbar = () => {
  const { logout } = useUserStore();

  const router = useNavigate();

  const handleLogout = () => {
    logout();
    router("/");
  };

  const location = useLocation();

  const NAVIGATION = [
    {
      title: "대시보드",
      path: "/dashboard",
      icon: <DashboardIcon />,
    },
    { title: "회원 목록", path: "/users", icon: <GroupIcon /> },
    {
      title: "경기 목록",
      path: "/games",
      icon: <SportsBasketballIcon />,
    },
    {
      title: "신고 목록",
      path: "/reports",
      icon: <FlagIcon />,
    },

    {
      title: "정산금 요청 목록",
      path: "/settlements",
      icon: <PaymentIcon />,
    },

    {
      title: "익명 문의 목록",
      path: "/support",
      icon: <SupportAgentIcon />,
    },
    {
      title: "결제완료 목록",
      path: "/payments",
      icon: <ReceiptIcon />,
    },
  ];

  return (
    <nav
      className={` ${
        location.pathname === "/" || location.pathname === "/auth"
          ? "hidden"
          : "block"
      }  h-[4rem] bg-[#000] text-white w-full flex items-center justify-between px-[2rem]  drop-b-shadow-sm  z-[9999]`}
    >
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-2xl">MITI</h1>
        <ul className="flex items-center  gap-4 font-[400] ">
          {NAVIGATION.map((nav, index) => (
            <li key={index}>
              <Link
                className=" text-[16px] font-semibold "
                to={nav.path}
                style={{
                  color: location.pathname.includes(nav.path)
                    ? "#fff"
                    : "#717171",
                }}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="hover:font-bold" onClick={handleLogout}>
        로그아웃
      </button>
    </nav>
  );
};

export default Navbar;
