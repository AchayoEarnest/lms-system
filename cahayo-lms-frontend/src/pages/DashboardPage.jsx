import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import Header from "../components/Common/Header";
import { courseService } from "../services/courseService";
import { analyticsService } from "../services/analyticsService";

const DashboardPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrollmentsRes, analyticsRes] = await Promise.all([
        courseService.getEnrollments(),
        analyticsService.getMyAnalytics(),
      ]);

      setEnrollments(enrollmentsRes.data.results || enrollmentsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const stats = [
    { icon: "📚", label: "Enrolled", value: enrollments.length },
    {
      icon: "✅",
      label: "Completed",
      value: enrollments.filter((e) => e.status === "completed").length,
    },
    { icon: "⏱️", label: "Hours", value: analytics?.total_time_spent || 0 },
    { icon: "🏆", label: "Badges", value: analytics?.total_badges || 0 },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Welcome to Cahayo LMS!"
        subtitle="Let's continue with your learning"
      />

      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Current Lesson */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  CURRENT LESSON
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  Continue Your Learning
                </h3>
              </div>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                IN PROGRESS
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              Pick up where you left off and continue your learning journey
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all">
                Continue Lesson
              </button>
              <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all">
                View Resources
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Your Progress
            </h3>
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
                >
                  <span className="text-gray-700 font-medium">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen size={32} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {enrollment.course_title}
                </h3>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{enrollment.progress_percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${enrollment.progress_percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
