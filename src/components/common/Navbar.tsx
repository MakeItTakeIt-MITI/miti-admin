import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { NAVIGATION } from "../../constants/NAVIGATION";

const Navbar = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string): boolean => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <aside className="w-[280px] min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Brand Header with Logout */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600/20 flex items-center justify-center ring-1 ring-blue-500/30">
              <span className="text-xl font-bold text-blue-400">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-white">
                MITI Admin
              </span>
              <span className="text-xs text-gray-400">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <span>로그아웃</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {NAVIGATION.map((nav) => {
            const active = isActive(nav.path);
            const Icon = nav.icon;

            return (
              <li key={nav.path}>
                <Link
                  to={nav.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      active ? "text-blue-400" : "text-gray-500"
                    }`}
                  />
                  <span>{nav.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
