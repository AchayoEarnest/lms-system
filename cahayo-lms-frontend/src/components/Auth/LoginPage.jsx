import React, { useState, useEffect } from "react";
import Header from "../components/Common/Header";
import DashboardStats from "../components/Dashboard/DashboardStats";
import CurrentLessonCard from "../components/Dashboard/CurrentLessonCard";
import EnrolledCoursesList from "../components/Dashboard/EnrolledCoursesList";
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
      const [enrollmentsRes, analyticsRes] = await Promise.all([
        courseService.getEnrollments(),
        analyticsService.getMyAnalytics(),
      ]);

      setEnrollments(enrollmentsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

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
          <div className="lg:col-span-2">
            <CurrentLessonCard
              lesson={{ title: "Continue Learning", progress: 45 }}
            />
          </div>
          <div>
            <DashboardStats stats={stats.slice(0, 2)} />
          </div>
        </div>
        <EnrolledCoursesList
          courses={enrollments.map((e) => ({
            ...e,
            title: e.course_title,
            progress: e.progress_percentage,
          }))}
        />
      </main>
    </div>
  );
};

export default DashboardPage;
