import { NavLink } from "react-router-dom";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  return (
    <>
      <aside
        className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-64 flex-col border-r border-slate-200 bg-white p-4 transition-transform duration-300 md:sticky md:z-auto md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Branding */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900">CollabSpace</h2>
          <p className="text-sm text-slate-500">Team workspace</p>
        </div>

        {/* Main Navigation */}
        <nav>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <ul className="space-y-1">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="4" width="6" height="6" rx="1" />
                  <rect x="14" y="4" width="6" height="6" rx="1" />
                  <rect x="4" y="14" width="6" height="6" rx="1" />
                  <rect x="14" y="14" width="6" height="6" rx="1" />
                </svg>

                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/projects"
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
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
                    d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                  />
                </svg>

                Projects
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="mt-auto border-t border-slate-200 pt-4">
          <NavLink
            to="/settings"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
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
                d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.8 1.8-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.54v-.1a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.8-1.8.06-.06A1.7 1.7 0 0 0 8.12 15a1.7 1.7 0 0 0-1.56-1.03H6v-2.54h.1A1.7 1.7 0 0 0 7.66 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.8-1.8.06.06A1.7 1.7 0 0 0 11 6.66a1.7 1.7 0 0 0 1.03-1.56V5h2.54v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.8 1.8-.06.06A1.7 1.7 0 0 0 19.88 10a1.7 1.7 0 0 0 1.56 1.03h.1v2.54h-.1A1.7 1.7 0 0 0 19.4 15Z"
              />
            </svg>

            Settings
          </NavLink>
        </div>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
}

export default Sidebar;