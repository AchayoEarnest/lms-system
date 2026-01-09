import React, { useState, useEffect } from "react";
import Header from "../components/Common/Header";
import { analyticsService } from "../services/analyticsService";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsService.getMyAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
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
    {
      icon: "⏱️",
      label: "Total Hours",
      value: analytics?.total_time_spent || 0,
    },
    {
      icon: "✅",
      label: "Completed",
      value: analytics?.courses_completed || 0,
    },
    { icon: "🔥", label: "Streak", value: "12 days" },
    {
      icon: "📊",
      label: "Avg Score",
      value: `${analytics?.avg_score?.toFixed(0) || 0}%`,
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <Header title="Learning Analytics" subtitle="Track your progress" />
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
