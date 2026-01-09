import React, { useState } from "react";
import {
  ChevronDown,
  BookOpen,
  Play,
  Eye,
  MessageSquare,
  Calendar,
  Target,
  TrendingUp,
  Bell,
  Menu,
  X,
} from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState("regression");

  const modules = [
    { id: "overview", title: "1. Module Overview: Regression", icon: "📊" },
    {
      id: "intro",
      title: "2. An Introduction To Machine Learning",
      icon: "🤖",
    },
    { id: "linear", title: "3. Linear Models", icon: "📈" },
    { id: "performance", title: "4. Modal Performance", icon: "⚡" },
    {
      id: "regression",
      title: "5. Multiple Linear Regression",
      icon: "📉",
      expanded: true,
    },
  ];

  const submodules = [
    {
      id: "s1",
      title: "Lesson Overview: Multiple Linear Regression",
      icon: "📝",
    },
    {
      id: "s2",
      title: "Fitting A Multiple Linear Regression Model in Sklearn [Video]",
      icon: "🎥",
    },
    {
      id: "s3",
      title: "Multiple linear Regression Advanced Regression Analysis [Video]",
      icon: "🎥",
    },
    {
      id: "s4",
      title: "Multiple linear Regression Fitting & Model in Sklearn [Example]",
      icon: "📚",
    },
    {
      id: "s5",
      title:
        "Multiple linear Regression Advanced Regression Analysis I [Example]",
      icon: "📚",
    },
    {
      id: "s6",
      title:
        "Multiple linear Regression Advanced Regression Analysis 2 [Example]",
      icon: "📚",
    },
    { id: "s7", title: "Multiple linear Regression [Exercise]", icon: "✏️" },
  ];

  const currentLesson = {
    title: "Multiple linear regression",
    progress: 0,
    dueDate: "January 9th",
    moduleName: "Regression Module",
  };

  const testTimeline = [
    {
      date: "06 Jan 2026",
      title: "Linear regression",
      status: "completed",
      challenge: "[Code Challenge]",
    },
    {
      date: "13 Jan 2026",
      title: "Multiple linear regression with regularization",
      status: "completed",
      challenge: "[Quiz]",
    },
    {
      date: "03 Feb 2026",
      title: "Decision tree",
      status: "pending",
      challenge: "[Code Challenge]",
    },
  ];

  const stats = [
    { icon: "🎯", label: "Problem Statement", value: "" },
    { icon: "🎲", label: "Predict", value: "" },
    { icon: "📊", label: "Sprint Completion", value: "22%" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 overflow-y-auto flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold">
              alx
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Athena</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-800 p-1 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="px-4 py-2">
          {sidebarOpen && (
            <>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                Sprint
              </p>
              <p className="text-sm font-semibold text-white">
                Regression Module
              </p>
            </>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {modules.map((module) => (
            <div key={module.id}>
              <button
                onClick={() => setActiveModule(module.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  activeModule === module.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <span className="text-xl">{module.icon}</span>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-sm">{module.title}</span>
                    {module.expanded && <ChevronDown size={16} />}
                  </>
                )}
              </button>

              {sidebarOpen && module.expanded && (
                <div className="ml-4 mt-2 space-y-1 border-l border-gray-700 pl-4">
                  {submodules.map((sub) => (
                    <button
                      key={sub.id}
                      className="w-full text-left text-xs text-gray-400 hover:text-gray-200 py-2 flex items-center gap-2 transition-colors"
                    >
                      <span>{sub.icon}</span>
                      <span className="line-clamp-1">{sub.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Regression Module
            </h1>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              IN PROGRESS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              EA
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, Earnest!
            </h2>
            <p className="text-gray-600">
              Let's Continue With Regression Module
            </p>
          </div>

          {/* Current Lesson */}
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                  CURRENT LESSONS
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentLesson.title}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">DUE DATE</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentLesson.dueDate}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  {currentLesson.progress}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${currentLesson.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2">
                <Play size={18} /> Start Lesson
              </button>
              <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2">
                <Eye size={18} /> View
              </button>
            </div>
          </div>

          {/* Announcements & Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare size={20} className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  ANNOUNCEMENT
                </h3>
              </div>
              <p className="text-gray-500 text-center py-8">
                No announcements today
              </p>
            </div>

            {/* Webinars */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={20} className="text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  WEBINARS/MEETINGS
                </h3>
              </div>
              <p className="text-gray-500 text-center py-8">
                No upcoming events
              </p>
            </div>
          </div>

          {/* Test Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              TEST TIMELINE
            </h3>
            <div className="space-y-4">
              {testTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.status === "completed"
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    {idx < testTimeline.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <p className="text-gray-900 font-semibold">{item.title}</p>
                    <a
                      href="#"
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      {item.challenge} More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{stat.icon}</div>
                <h4 className="text-gray-900 font-semibold text-center">
                  {stat.label}
                </h4>
                {stat.value && (
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
