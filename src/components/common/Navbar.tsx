import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { NAVIGATION } from "../../constants/NAVIGATION";

const Navbar = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const baseNavLinkClass =
    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors";
  const activeNavLinkClass = "text-white bg-gray-800";
  const inactiveNavLinkClass =
    "text-gray-400 hover:text-white hover:bg-gray-800/50";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Brand Header */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-lg bg-blue-600/20 flex items-center justify-center ring-1 ring-blue-500/30">
            <span className="text-xl font-bold text-blue-400">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">MITI</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>로그아웃</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {NAVIGATION.map((nav) => (
            <li key={nav.path}>
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  `${baseNavLinkClass} ${isActive ? activeNavLinkClass : inactiveNavLinkClass}`
                }
              >
                <span>{nav.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
