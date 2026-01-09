import React from "react";
import { Play, Eye } from "lucide-react";

const CurrentLessonCard = ({ lesson }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
    <div className="flex items-start justify-between mb-6">
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
          CURRENT LESSON
        </p>
        <h3 className="text-2xl font-bold text-gray-900">
          {lesson?.title || "Continue Learning"}
        </h3>
      </div>
      <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
        IN PROGRESS
      </span>
    </div>
    <p className="text-gray-600 mb-6">
      {lesson?.description || "Pick up where you left off"}
    </p>
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">
          {lesson?.progress || 0}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full"
          style={{ width: `${lesson?.progress || 0}%` }}
        ></div>
      </div>
    </div>
    <div className="flex gap-4">
      <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all flex items-center gap-2">
        <Play size={18} /> Continue Lesson
      </button>
      <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
        <Eye size={18} /> View Resources
      </button>
    </div>
  </div>
);

export default CurrentLessonCard;
