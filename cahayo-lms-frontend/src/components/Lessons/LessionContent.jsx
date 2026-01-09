import React from "react";

const LessonContent = ({ lesson }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">{lesson?.title}</h2>
    <p className="text-gray-600 mb-4">{lesson?.description}</p>
    <div className="prose max-w-none">{lesson?.content}</div>
  </div>
);

export default LessonContent;
