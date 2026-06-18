import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Trophy,
  MapPin,
  UsersRound,
  Flag,
  Banknote,
  MessageSquare,
  ShieldQuestion,
  Ticket,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useUserStore } from "../../store/useUserStore";
import { NAVIGATION } from "../../constants/NAVIGATION";
import { cn } from "../../lib/utils";

const NAV_ICONS = [
  LayoutDashboard,
  Users,
  Trophy,
  MapPin,
  UsersRound,
  Flag,
  Banknote,
  MessageSquare,
  ShieldQuestion,
  Ticket,
  Bell,
];

const Navbar = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  const sidebarContent = (
    <>
      {/* Brand header */}
      <div className="flex items-center justify-between p-5 border-b border-zinc-800">
        <Link to="/" onClick={closeMobile} className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-blue-600/20 flex items-center justify-center ring-1 ring-blue-500/30 shrink-0">
            <span className="text-lg font-bold text-blue-400">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">MITI</span>
            <span className="text-[11px] text-zinc-500">Admin Console</span>
          </div>
        </Link>
        <button
          onClick={closeMobile}
          aria-label="사이드바 닫기"
          className="md:hidden p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-800"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-0.5">
          {NAVIGATION.map((nav, i) => {
            const Icon = NAV_ICONS[i] ?? LayoutDashboard;
            return (
              <li key={nav.path}>
                <NavLink
                  to={nav.path}
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                      isActive
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/60",
                    )
                  }
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{nav.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          aria-label="로그아웃"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-rose-600/20 hover:text-rose-400"
        >
          <LogOut className="size-4 shrink-0" />
          <span>로그아웃</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-3 [padding-left:calc(1rem+env(safe-area-inset-left))]">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="메뉴 열기"
          className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <Menu className="size-5" />
        </button>
        <span className="text-sm font-semibold text-white">MITI Admin</span>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col w-64 bg-zinc-900 border-r border-zinc-800",
          "fixed inset-y-0 left-0 h-dvh z-50 [padding-bottom:env(safe-area-inset-bottom)]",
          "md:static md:z-auto md:h-dvh md:flex md:shrink-0",
          mobileOpen ? "flex" : "hidden md:flex",
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Navbar;
