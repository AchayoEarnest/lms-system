import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  BookOpen,
  MessageSquare,
  Target,
  Award,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", path: "/" },
    { id: "courses", icon: BookOpen, label: "Courses", path: "/courses" },
    {
      id: "discussions",
      icon: MessageSquare,
      label: "Discussions",
      path: "/discussions",
    },
    {
      id: "assignments",
      icon: Target,
      label: "Assignments",
      path: "/assignments",
    },
    {
      id: "certificates",
      icon: Award,
      label: "Certificates",
      path: "/certificates",
    },
    {
      id: "analytics",
      icon: BarChart3,
      label: "Analytics",
      path: "/analytics",
    },
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNavigation = (item) => {
    setCurrentPage(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-72" : "w-20"
      } bg-gray-900 text-white transition-all duration-300 overflow-y-auto flex flex-col`}
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
            CL
          </div>
          {sidebarOpen && <span className="font-bold text-lg">Cahayo</span>}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hover:bg-gray-800 p-1 rounded"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="px-4 py-6 space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
              currentPage === item.id
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <item.icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <LogOut size={18} /> {sidebarOpen && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
