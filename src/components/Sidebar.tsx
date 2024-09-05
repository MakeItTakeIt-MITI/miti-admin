import { Link, useLocation } from "react-router-dom";
import Logout from "./auth/Logout";

const Sidebar = () => {
  const location = useLocation();

  const NAVITEMS = [
    { title: "대시보드", path: "/dashboard" },
    { title: "회원 관리", path: "/users" },
    {
      title: "신고 목록",
      subcategories: [
        { title: "호스트 신고", path: "/reports/host" },
        { title: "게스트 신고", path: "/reports/guest" },
      ],
    },
  ];
  return (
    <aside className="w-[240px] h-full bg-[#fff] text-[#000] flex flex-col">
      <div className="flex items-center justify-center h-[10rem] w-full border-b border-[#fff]">
        <h1
          style={{
            letterSpacing: "2px",
          }}
          className="text-4xl font-bold "
        >
          MITI
        </h1>
      </div>

      <div className="p-4   relative h-full w-full ">
        <div className="flex flex-col   gap-3 font-[500] text-[14px]">
          {NAVITEMS.map((nav, index) => (
            <>
              {nav.path ? (
                <Link
                  style={{
                    backgroundColor:
                      location.pathname === nav.path ? "#01060fb4" : "#fff",
                    color: location.pathname === nav.path ? "#fff" : "#000",
                  }}
                  className=" text-black h-[2rem] rounded-lg px-2 flex items-center "
                  to={nav.path}
                  key={index}
                >
                  {nav.title}
                </Link>
              ) : (
                <div
                  key={index}
                  className=" text-black h-[2rem] rounded-lg px-2 flex items-center"
                >
                  {nav.title}
                </div>
              )}

              {nav.subcategories &&
                nav.subcategories.map((category, index) => (
                  <Link
                    style={{
                      backgroundColor:
                        location.pathname === category.path
                          ? "#01060fb4"
                          : "#fff",
                      color:
                        location.pathname === category.path ? "#fff" : "#000",
                    }}
                    key={index}
                    to={category.path}
                    className="ml-5 text-black h-[2rem] rounded-lg px-2 flex items-center "
                  >
                    {category.title}
                  </Link>
                ))}
              <hr />
            </>
          ))}
        </div>
        <div className="flex justify-center">
          <Logout />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
