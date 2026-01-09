import React from "react";
import { Bell } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Header = ({ title, subtitle }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          {user?.username?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
};

export default Header;
