import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { Button } from "../ui/button";
import clsx from "clsx";
import { NAVIGATION } from "../../constants/navigation.ts";

const Navbar = () => {
  const { logout } = useUserStore();

  const router = useNavigate();

  const handleLogout = () => {
    logout();
    router("/");
  };

  const location = useLocation();

  return (
    <nav
      className={` ${
        location.pathname === "/" || location.pathname === "/auth"
          ? "hidden"
          : "block"
      }  h-[3.5rem] bg-[#000] text-white w-full flex items-center justify-between px-[2rem]  drop-b-shadow-sm  z-[9999]`}
    >
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-2xl">MITI</h1>
        <ul className="flex items-center gap-4 font-[400]">
          {NAVIGATION.map((nav, index) => (
            <li key={index}>
              <Link
                className={clsx(
                  "text-sm font-semibold",
                  location.pathname.includes(nav.path)
                    ? "text-white"
                    : "text-[#717171]"
                )}
                to={nav.path}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={handleLogout} variant="ghost" size={"default"}>
        <span className="text-[14x] font-semibold">로그아웃</span>
      </Button>
    </nav>
  );
};

export default Navbar;
