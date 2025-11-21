import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { Button } from "../ui/button";
import { NAVIGATION } from "../../constants/NAVIGATION";
import React from "react";

const Navbar = () => {
  const { logout } = useUserStore();
  const router = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    router("/login");
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside className="w-[300px] min-h-screen bg-gray-900 text-white border-r border-gray-800 p-6 flex flex-col gap-6">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2">
        {/* <div className="h-9 w-9 rounded-md bg-blue-600/20 ring-1 ring-inset ring-blue-500/30" /> */}
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold">MITI 관리자</span>
          <span className="text-[11px] text-gray-400">대시보드</span>
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex flex-col gap-1">
        {NAVIGATION.map((nav) => {
          const active = isActive(nav.path);
          return (
            <li key={nav.path} className="w-full">
              <Link to={nav.path} className="block">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 rounded-md transition-colors
                    ${
                      active
                        ? "bg-gray-800 text-white ring-1 ring-gray-700"
                        : "text-gray-300 hover:bg-gray-800/60 hover:text-white"
                    }`}
                >
                  {React.createElement(nav.icon, {
                    className: `text-xl ${
                      active
                        ? "text-blue-400"
                        : "text-gray-400 group-hover:text-white"
                    }`,
                  })}
                  <span className="text-xs font-medium">{nav.title}</span>
                </Button>
              </Link>
            </li>
          );
        })}

        <li className="mt-auto pt-4 border-t border-gray-800">
          <Button
            variant="secondary"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
