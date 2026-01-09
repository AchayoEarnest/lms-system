import React from 'react';
import { BookOpen, Star, Users } from 'lucide-react';

const CourseCard = ({ course, onEnroll }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
    <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
      <BookOpen size={40} className="text-white" />
    </div>
    <div className="p-6">
      <h3 className="font-bold text-gray-900 mb-2 text-lg">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-4">by {course.instructor}</p>
      <div className="flex justify-between text-xs text-gray-600 mb-4">
        <span className="flex items-center gap-1"><Users size={14} /> {course.students} students</span>
        <span className="flex items-center gap-1"><Star size={14} /> {course.rating}</span>
      </div>
      <button
        onClick={() => onEnroll(course.id)}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
      >
        Enroll Now
      </button>
    </div>
  </div>
);

export default CourseCard;
