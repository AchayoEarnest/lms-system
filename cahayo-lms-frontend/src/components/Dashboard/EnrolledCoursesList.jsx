import React from "react";
import { BookOpen } from "lucide-react";

const EnrolledCoursesList = ({ courses }) => (
  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses?.map((course) => (
        <div
          key={course.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
            <BookOpen size={32} className="text-white" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              course.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {course.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default EnrolledCoursesList;
