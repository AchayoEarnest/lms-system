import React from "react";
import CourseCard from "./CourseCard";

const CourseGrid = ({ courses, onEnroll }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {courses?.map((course) => (
      <CourseCard key={course.id} course={course} onEnroll={onEnroll} />
    ))}
  </div>
);

export default CourseGrid;
