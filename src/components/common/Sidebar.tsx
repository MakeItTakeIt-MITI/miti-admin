import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { Button } from "../ui/button";
import { NAVIGATION } from "../../constants/NAVIGATION";
import React from "react";

const Sidebar = () => {
  const { logout } = useUserStore();
  const router = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    router("/login");
  };

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <aside className="w-[280px] min-h-screen text-white  border-r border-[#666] p-6 flex flex-col gap-6">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 ">
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold">MITI 관리자</span>
          <span className="text-xs text-muted-foreground">대시보드</span>
        </div>
      </div>

      {/* Navigation */}
      <ul className="flex flex-col gap-1 flex-grow">
        {NAVIGATION.map((nav) => {
          const active = isActive(nav.path);
          return (
            <li key={nav.path} className="w-full">
              <Button
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start gap-3"
                asChild
              >
                <Link to={nav.path}>
                  {React.createElement(nav.icon, {
                    className: `h-5 w-5 ${
                      active ? "text-primary" : "text-muted-foreground"
                    }`,
                  })}
                  <span>{nav.title}</span>
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>

      <div className="">
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
