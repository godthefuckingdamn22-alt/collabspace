
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 md:px-6">
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="mr-3 rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        aria-label="Toggle sidebar"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Brand */}
      <h1 className="text-lg font-semibold text-slate-900">
        CollabSpace
      </h1>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Search"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
            />
            <path d="M10 21h4" />
          </svg>

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-slate-900">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-slate-500">
              {user?.email || ""}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Log out
        </button>
      </div>
    </header>
  );
}

export default Navbar;