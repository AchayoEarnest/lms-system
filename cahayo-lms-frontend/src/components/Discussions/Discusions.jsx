if (currentPage === "discussions") {
  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-gray-900 text-white transition-all flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              CL
            </div>
            {sidebarOpen && <span className="font-bold">Cahayo</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
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
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                currentPage === item.id
                  ? "bg-blue-600"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0">
          <h1 className="text-2xl font-bold text-gray-900">Discussion Forum</h1>
        </header>

        <main className="p-8 max-w-4xl mx-auto">
          <button className="mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Start New Discussion
          </button>

          <div className="space-y-4">
            {[
              {
                title: "How to optimize database queries?",
                author: "Alex Chen",
                replies: 12,
                views: 234,
              },
              {
                title: "Best practices for React hooks",
                author: "Sarah Smith",
                replies: 8,
                views: 156,
              },
              {
                title: "Docker networking explained",
                author: "Mike Brown",
                replies: 15,
                views: 301,
              },
            ].map((discussion, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {discussion.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Started by {discussion.author}
                </p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>💬 {discussion.replies} replies</span>
                  <span>👁️ {discussion.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
