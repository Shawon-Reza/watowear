import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  BadgeDollarSign,
} from "lucide-react";

export default function Dashboard({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems = [
    {
      items: [
        {
          name: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          path: "/admin/admin_home",
          badge: "3",
        },
        {
          name: "User Management",
          icon: <Users size={20} />,
          path: "/admin/user_management",
          badge: "12",
        },
        {
          name: "Subcriptions",
          icon: <BadgeDollarSign size={20} />,
          path: "/admin/package_management",
          badge: "12",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-[#F4F1EB]">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-[#6A6D57] shadow-xl transition-all duration-500 ease-in-out relative flex flex-col`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center pt-6 pb-6 border-b border-[#F4F1EB]/20 relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative flex-shrink-0">
              <img
                src="https://i.ibb.co.com/LXTYr3ZH/Chlo-logo.png"
                alt="Logo"
                className="w-[50px] h-auto transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#F4F1EB]/10 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div
              className={`transform transition-all duration-500 overflow-hidden ${
                isCollapsed ? "opacity-0 invisible w-0" : "opacity-100 visible"
              }`}
            >
              <div className="font-bold text-xl text-[#F4F1EB] uppercase tracking-wider drop-shadow-sm whitespace-nowrap">
                watowear
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#6A6D57] via-[#6A6D57]/95 to-[#6A6D57] opacity-50"></div>
        </div>

        {/* Nav Section */}
        <nav className="p-4 space-y-2 flex-1">
          {menuItems.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <ul className="space-y-2">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="relative group">
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-3 rounded-xl group/item relative transition-all duration-300 ${
                        pathname === item.path
                          ? "bg-[#F4F1EB] text-[#6A6D57] shadow-lg shadow-[#F4F1EB]/20"
                          : "text-[#F4F1EB]/90 hover:bg-[#F4F1EB]/15 hover:text-[#F4F1EB] hover:shadow-md"
                      }`}
                    >
                      {/* Icon */}
                      <span
                        className={`transition-all duration-300 ${
                          pathname === item.path
                            ? "text-[#6A6D57]"
                            : "text-[#F4F1EB]/80 group-hover/item:text-[#F4F1EB]"
                        }`}
                      >
                        {item.icon}
                      </span>

                      {/* Label */}
                      <span
                        className={`ml-3 transition-all duration-500 font-medium tracking-wide whitespace-nowrap ${
                          isCollapsed
                            ? "opacity-0 invisible w-0"
                            : "opacity-100 visible"
                        } ${pathname === item.path ? "font-semibold" : ""}`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#6A6D57] to-transparent pointer-events-none"></div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-[#6A6D57]/10 shadow-sm backdrop-blur-sm">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2.5 hover:bg-[#F4F1EB] text-[#6A6D57] rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-md group"
              >
                <div className="transform transition-transform duration-300 group-hover:rotate-12">
                  {isCollapsed ? (
                    <ChevronsRight size={20} />
                  ) : (
                    <ChevronsLeft size={20} />
                  )}
                </div>
              </button>

              <div className="flex items-center max-w-md relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full px-4 py-2.5 text-sm border border-[#6A6D57]/20 rounded-xl focus:outline-none focus:border-[#6A6D57] focus:ring-2 focus:ring-[#6A6D57]/10 transition-all duration-300 bg-[#F4F1EB]/30 placeholder-[#6A6D57]/60 hover:bg-[#F4F1EB]/50"
                />
                <div className="absolute right-3 text-[#6A6D57]/40"></div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 hover:bg-[#F4F1EB] text-[#6A6D57] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-md group">
                <div className="transform transition-transform duration-300 group-hover:rotate-90">
                  <Settings size={20} />
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8 bg-gradient-to-br from-[#F4F1EB]/50 via-white to-[#F4F1EB]/30">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
}
