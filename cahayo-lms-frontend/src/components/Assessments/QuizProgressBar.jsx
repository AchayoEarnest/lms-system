import React from "react";

const QuizProgressBar = ({ current, total }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 mb-6">
    <div className="flex justify-between mb-2 text-sm text-gray-600">
      <span>
        Question {current} of {total}
      </span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-500 h-2 rounded-full"
        style={{ width: `${(current / total) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default QuizProgressBar;
