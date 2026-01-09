import React from "react";
import { Search } from "lucide-react";

const CourseSearch = ({ onSearch }) => (
  <div className="relative">
    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="Search courses..."
      onChange={(e) => onSearch(e.target.value)}
      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
    />
  </div>
);

export default CourseSearch;
