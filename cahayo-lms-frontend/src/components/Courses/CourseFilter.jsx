import React, { useState } from "react";
import { Filter } from "lucide-react";

const CourseFilter = ({ onFilter }) => {
  const [category, setCategory] = useState("");

  const handleFilter = () => {
    onFilter({ category });
  };

  return (
    <div className="flex items-center gap-4">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        <option value="programming">Programming</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
      </select>
      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <Filter size={18} /> Apply
      </button>
    </div>
  );
};

export default CourseFilter;
