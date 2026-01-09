import React from 'react';

const LessonProgress = ({ progress }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <h3 className="font-bold text-gray-900 mb-4">Your Progress</h3>
    <div>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Completion</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);

export default LessonProgress;