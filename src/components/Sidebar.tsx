import { Link, useLocation } from "react-router-dom";
import Logout from "./auth/Logout";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import PaymentIcon from "@mui/icons-material/Payment";

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
    <aside className="w-[240px] h-full bg-[#fff] text-[#000] flex flex-col">
      <div className="flex items-center justify-center h-[10rem] w-full ">
        <h1
          style={{
            letterSpacing: "2px",
          }}
          className="text-4xl font-bold "
        >
          MITI
        </h1>
      </div>

      <div className="p-4 relative h-full w-full flex flex-col justify-between">
        <div className="flex flex-col gap-4 font-[500] text-[14px]">
          {NAVITEMS.map((nav, index) => (
            <div
              style={{
                padding: "4px",
                borderRadius: "4px",
                border:
                  location.pathname === nav.path ? "0.5px solid black" : "none",
                // backgroundColor:
                //   location.pathname === nav.path ? "#01060fb4" : "#fff",
              }}
              key={index}
              className="flex items-center gap-1 "
            >
              <div> {nav.icon}</div>
              <Link
                className="  h-[2rem] rounded-lg px-2 flex items-center"
                to={nav.path}
                style={{
                  color: location.pathname === nav.path ? "#585858" : "#000",
                }}
              >
                {nav.title}
              </Link>
              {location.pathname !== nav.path &&
                index !== NAVITEMS.length - 1 && <hr />}
            </div>
          ))}
        </div>
        {/* <div className=" "> */}
        <Logout />
        {/* </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
