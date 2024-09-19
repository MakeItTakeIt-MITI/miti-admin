import { Link, useLocation } from "react-router-dom";
import Logout from "./auth/Logout";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentIcon from "@mui/icons-material/Payment";
import logo from "../assets/logo.svg";
const Sidebar = () => {
  const location = useLocation();
  const NAVITEMS = [
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
  ];

  return (
    <aside className="w-[300px] h-full bg-[#fff] text-[#000] flex flex-col">
      <div className="flex items-center justify-center h-[10rem] w-full bg-black ">
        <img src={logo} alt="logo" />
      </div>

      <div className="p-4 relative h-full w-full flex flex-col justify-between">
        <div className="flex flex-col gap-3 font-[500] text-[14px]">
          {NAVITEMS.map((nav, index) => (
            <Link
              className="  h-[2.5rem] rounded-lg px-2 py-1 flex items-center"
              to={nav.path}
              key={index}
              style={{
                color: "#000",
                borderRadius: "4px",
                border:
                  location.pathname === nav.path
                    ? "0.5px solid #a0a0a0"
                    : "none",
              }}
            >
              <div className="flex items-center gap-1 ">
                <div> {nav.icon}</div>
                <h2> {nav.title}</h2>
                {location.pathname !== nav.path &&
                  index !== NAVITEMS.length - 1 && <hr />}
              </div>
            </Link>
          ))}
        </div>
        <Logout />
      </div>
    </aside>
  );
};

export default Sidebar;
