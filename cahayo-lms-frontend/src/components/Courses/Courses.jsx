if (currentPage === "courses") {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 overflow-y-auto flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              AL
            </div>
            {sidebarOpen && <span className="font-bold">Cahayo</span>}
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
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                currentPage === item.id
                  ? "bg-blue-600"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-gray-900">All Courses</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Filter size={18} /> Filter
            </button>
          </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced Python",
                instructor: "Dr. Smith",
                students: 234,
                rating: 4.8,
              },
              {
                title: "React Mastery",
                instructor: "Jane Doe",
                students: 456,
                rating: 4.9,
              },
              {
                title: "AWS Fundamentals",
                instructor: "John Wilson",
                students: 345,
                rating: 4.7,
              },
              {
                title: "Django REST API",
                instructor: "Mike Johnson",
                students: 267,
                rating: 4.6,
              },
              {
                title: "TypeScript Advanced",
                instructor: "Sarah Lee",
                students: 189,
                rating: 4.8,
              },
              {
                title: "Docker & Kubernetes",
                instructor: "Tom Brown",
                students: 298,
                rating: 4.7,
              },
            ].map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <BookOpen size={40} className="text-white" />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    by {course.instructor}
                  </p>
                  <div className="flex justify-between text-xs text-gray-600 mb-4">
                    <span>👥 {course.students} students</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
