if (currentPage === 'analytics') {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-gray-900 text-white transition-all flex flex-col`}>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">CL</div>
              {sidebarOpen && <span className="font-bold">Cahayo</span>}
            </div>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
          <nav className="px-4 py-6 space-y-2 flex-1">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'courses', icon: BookOpen, label: 'Courses' },
              { id: 'discussions', icon: MessageSquare, label: 'Discussions' },
              { id: 'assignments', icon: Target, label: 'Assignments' },
              { id: 'certificates', icon: Award, label: 'Certificates' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                  currentPage === item.id ? 'bg-blue-600' : 'text-gray-300 hover:bg-gray-800'
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
            <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
          </header>

          <main className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Hours', value: '245', icon: '⏱️', color: 'blue' },
                { label: 'Courses Completed', value: '2', icon: '✅', color: 'green' },
                { label: 'Current Streak', value: '12 days', icon: '🔥', color: 'orange' },
                { label: 'Average Score', value: '87%', icon: '📊', color: 'purple' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Learning Activity (Last 7 days)</h3>
                <div className="space-y-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="w-12 text-gray-600 font-medium">{day}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${Math.random() * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Course Performance</h3>
                <div className="space-y-4">
                  {['Machine Learning', 'Web Dev', 'Python'].map((course, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium">{course}</span>
                        <span className="text-gray-900 font-bold">{(85 + Math.random() * 15).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${85 + Math.random() * 15}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return null;

