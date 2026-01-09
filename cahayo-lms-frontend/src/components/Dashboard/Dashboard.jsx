import { BookOpen } from "lucide-react";

if (currentPage === "dashboard") {
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
              CL
            </div>
            {sidebarOpen && <span className="font-bold text-lg">Cahayo</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-800 p-1 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2 flex-1">
          {[
            { id: "dashboard", icon: Home, label: "Dashboard" },
            { id: "courses", icon: BookOpen, label: "Courses" },
            { id: "discussions", icon: MessageSquare, label: "Discussions" },
            { id: "assignments", icon: Target, label: "Assignments" },
            { id: "certificates", icon: Award, label: "Certificates" },
            { id: "analytics", icon: BarChart3, label: "Analytics" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                currentPage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {username}!
            </h1>
            <p className="text-gray-600 text-sm">
              Let's continue with your learning
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              CA
            </div>
          </div>
        </header>

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
                    Multiple Linear Regression
                  </h3>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                  IN PROGRESS
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Learn advanced regression techniques and model evaluation
              </p>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">45% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-all flex items-center gap-2">
                  <Play size={18} /> Continue Lesson
                </button>
                <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all flex items-center gap-2">
                  <Eye size={18} /> View Resources
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    Courses Enrolled
                  </span>
                  <span className="text-2xl font-bold text-blue-600">5</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Completed</span>
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    Certificates
                  </span>
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700 font-medium">
                    Study Streak
                  </span>
                  <span className="text-2xl font-bold text-orange-600">
                    12 days
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Machine Learning 101",
                  progress: 75,
                  status: "Active",
                },
                { title: "Web Development", progress: 45, status: "Active" },
                { title: "Python Basics", progress: 100, status: "Completed" },
                { title: "Data Science", progress: 60, status: "Active" },
                { title: "Advanced SQL", progress: 30, status: "Active" },
                { title: "Cloud Computing", progress: 85, status: "Active" },
              ].map((course, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                    <BookOpen size={32} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
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
                      course.status === "Completed"
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
        </main>
      </div>
    </div>
  );
}
