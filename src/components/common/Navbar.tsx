import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentIcon from "@mui/icons-material/Payment";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useUserStore } from "../../store/useUserStore";

const Navbar = () => {
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const [displayProfileTab, setDisplayProfileTab] = useState(false);

  const { logout } = useUserStore();

  const router = useNavigate();

  const handleCloseAllSidebars = () => {
    setDisplaySideBar(false);
    setDisplayProfileTab(false);
  };

  const handleLogout = () => {
    logout();
    router("/");
    handleCloseAllSidebars();
  };

  const handleToggleSidebar = () => {
    setDisplayProfileTab(false);
    setDisplaySideBar(!displaySideBar);
  };

  const handleToggleProfileTab = () => {
    setDisplaySideBar(false);
    setDisplayProfileTab(!displayProfileTab);
  };

  const location = useLocation();

  const NAVIGATION = [
    {
      title: "대시보드",
      path: "/dashboard/main",
      icon: <DashboardIcon />,
    },
    { title: "회원 관리", path: "/users/list", icon: <GroupIcon /> },
    {
      title: "신고 목록",
      path: "/reports/category",
      icon: <FlagIcon />,
    },

    {
      title: "정산금 목록",
      path: "/settlements/list",
      icon: <PaymentIcon />,
    },
    {
      title: "경기 목록",
      path: "/games/list",
      icon: <SportsBasketballIcon />,
    },
    {
      title: "익명 문의 목록",
      path: "/support/list",
      icon: <SupportAgentIcon />,
    },
  ];

  const PROFILE = [
    {
      title: "프로필",
      path: "/dashboard/main",
      icon: <AccountBoxIcon />,
    },

    {
      title: "로그아웃",
      path: "/",
      icon: <ExitToAppIcon />,
    },
  ];

  return (
    <nav
      className={` ${
        location.pathname === "/" || location.pathname === "/auth"
          ? "hidden"
          : "block"
      } fixed h-[4rem] bg-[#fdfdfd] w-full flex items-center justify-between px-[1rem] `}
    >
      <button onClick={handleToggleSidebar}>
        {!displaySideBar ? (
          <MenuIcon fontSize="medium" sx={{ color: "black" }} />
        ) : (
          <CloseIcon />
        )}
      </button>
      <h1 className="font-bold text-3xl">MITI</h1>

      <div className="space-x-4">
        <NotificationsIcon />
        <button onClick={handleToggleProfileTab}>
          {displayProfileTab ? <CloseIcon /> : <AccountBoxIcon />}
        </button>
      </div>
      {displaySideBar && (
        <aside
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-4 absolute min-h-screen w-[20rem] left-0 top-full bottom-0 bg-[#fdfdfd] drop-r-shadow-sm border	"
        >
          <ul className="flex flex-col gap-3 font-[500] text-[14px]">
            {NAVIGATION.map((nav, index) => (
              <li key={index}>
                <Link
                  className="  h-[2.5rem] rounded-lg px-2 py-1 flex items-center "
                  to={nav.path}
                  onClick={handleCloseAllSidebars}
                  style={{
                    borderRadius: "4px",
                    color: location.pathname === nav.path ? "#0048d7" : "000",
                  }}
                >
                  <div className="flex items-center gap-3 ">
                    <div> {nav.icon}</div>
                    <h2> {nav.title}</h2>
                    {location.pathname !== nav.path &&
                      index !== NAVIGATION.length - 1 && <hr />}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
      {displayProfileTab && (
        <aside
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-4 absolute min-h-screen w-[20rem] right-0 top-full bottom-0 bg-[#fdfdfd] drop-r-shadow-sm border	"
        >
          <ul className="flex flex-col gap-3 font-[500] text-[14px]">
            {PROFILE.map((nav, index) => (
              <li key={index}>
                <Link
                  className="  h-[2.5rem] rounded-lg px-2 py-1 flex items-center"
                  to={nav.path}
                  onClick={nav.title === "로그아웃" ? handleLogout : undefined}
                >
                  <div className="flex items-center  gap-3 ">
                    <div> {nav.icon}</div>
                    <h2> {nav.title}</h2>
                    {location.pathname !== nav.path &&
                      index !== NAVIGATION.length - 1 && <hr />}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </nav>
  );
};

export default Navbar;
