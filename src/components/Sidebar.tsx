import { Link, useLocation } from "react-router-dom";
import Logout from "./auth/Logout";
import { useReportsListHook } from "../hook/useReportsListHook";

const Sidebar = () => {
  const location = useLocation();
  const { data: reportsListData } = useReportsListHook();

  const NAVITEMS = [
    { title: "대시보드", path: "/dashboard" },
    { title: "회원 관리", path: "/users" },
    {
      title: "경기 신고 목록",
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

      <div className="p-4 relative h-full w-full">
        <div className="flex flex-col gap-3 font-[500] text-[14px]">
          {NAVITEMS.map((nav, index) => (
            <div key={index}>
              {nav.path ? (
                <Link
                  style={{
                    backgroundColor:
                      location.pathname === nav.path ? "#01060fb4" : "#fff",
                    color: location.pathname === nav.path ? "#fff" : "#000",
                  }}
                  className="text-black h-[2rem] rounded-lg px-2 flex items-center"
                  to={nav.path}
                >
                  {nav.title}
                </Link>
              ) : (
                <div className="text-black h-[2rem] rounded-lg px-2 flex items-center">
                  {nav.title}
                </div>
              )}

              {/* Display reportsListData only under "신고 목록" */}
              {nav.title === "경기 신고 목록" && reportsListData && (
                <div className="ml-5 ">
                  {reportsListData.data.map(
                    (data: {
                      category: string;
                      id: number | string;
                      subcategory: string;
                    }) => (
                      <Link
                        key={data.id}
                        to={`/reports/${data.id}`}
                        style={{
                          backgroundColor:
                            location.pathname === `/reports/${data.id}`
                              ? "#01060fb4"
                              : "#fff",
                          color:
                            location.pathname === `/reports/${data.id}`
                              ? "#fff"
                              : "#000",
                        }}
                        className="text-black h-[2rem] rounded-lg px-2 flex items-center"
                      >
                        {data.category === "game_hosting_report" && (
                          /*
                          intentional_cheating: "고의적인 부정행위",
  incorrect_information: "잘못된 정보",
  etc: "기타",
                          */
                          <>
                            {data?.subcategory === "intentional_cheating" && (
                              <>고의적인 부정행휘 </>
                            )}
                            {data?.subcategory === "incorrect_information" && (
                              <>잘못된 정보 </>
                            )}
                            {data?.subcategory === "etc" && <>기타 </>}
                          </>
                        )}
                      </Link>
                    )
                  )}
                </div>
              )}
              <hr />
            </div>
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
