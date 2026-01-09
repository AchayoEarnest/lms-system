import React, { useState, useEffect } from "react";
import { BookOpen, Search, Star, Users } from "lucide-react";
import Header from "../components/Common/Header";
import { courseService } from "../services/courseService";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      const courseList = response.data.results || response.data;
      setCourses(courseList);
      setFilteredCourses(courseList);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleEnroll = async (courseId) => {
    try {
      await courseService.enrollCourse(courseId);
      alert("Successfully enrolled!");
      fetchCourses();
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("Failed to enroll");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex-1 overflow-auto">
      <Header title="All Courses" subtitle="Explore and enroll in courses" />
      <main className="p-8">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen size={40} className="text-white" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  {course.title}
                </h3>
                <div className="flex justify-between text-xs text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Users size={14} /> ~100 students
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} /> 4.8
                  </span>
                </div>
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursesPage;
