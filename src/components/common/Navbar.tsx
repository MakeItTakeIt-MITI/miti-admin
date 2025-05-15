import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { Button } from "../ui/button";
import clsx from "clsx";
import { NAVIGATION } from "../../constants/NAVIGATION";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import React from "react";

const Navbar = () => {
  const { logout } = useUserStore();

  const router = useNavigate();

  const handleLogout = () => {
    logout();
    router("/");
  };

  const location = useLocation();

  return (
    <aside className="w-72    p-8 flex flex-col justify-between h-screen ">
      <ul className="flex items-center flex-col gap-4">
        {NAVIGATION.map((nav) => {
          return (
            <li className=" text-lg font-semibold w-full" key={nav.path}>
              {/* <Link to={nav.path}></Link> */}

              <Link to={nav.path}>
                <Button variant="ghost" className="w-full">
                  {React.createElement(nav.icon, { className: "text-xl" })}
                  <span> {nav.title}</span>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>

      <Button variant="destructive" className="w-full" onClick={handleLogout}>
        로그아웃
      </Button>
    </aside>
    // <nav
    //   className={` ${
    //     location.pathname === "/" || location.pathname === "/auth"
    //       ? "hidden"
    //       : "block"
    //   }  h-[3.5rem] bg-[#000] text-white w-full flex items-center justify-between px-[2rem]  drop-b-shadow-sm  z-[9999]`}
    // >
    //   <div className="flex items-center gap-6">
    //     <h1 className="font-bold text-2xl">MITI</h1>
    //     <ul className="flex items-center gap-4 font-[400]">
    //       {NAVIGATION.map((nav, index) => (
    //         <li key={index}>
    //           <Link
    //             className={clsx(
    //               "text-sm font-semibold",
    //               location.pathname.includes(nav.path)
    //                 ? "text-white"
    //                 : "text-[#717171]"
    //             )}
    //             to={nav.path}
    //           >
    //             {nav.title}
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    //   <Button onClick={handleLogout} variant="ghost" size={"default"}>
    //     <span className="text-[14x] font-semibold">로그아웃</span>
    //   </Button>
    // </nav>
  );
};

export default Navbar;
