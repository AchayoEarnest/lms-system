import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Sidebar from "./components/Common/Sidebar";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import LoginPage from "./pages/Auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import DiscussionsPage from "./pages/DiscussionsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

// // addedbyearnest
// import SignupPage from "./pages/Auth/SignupPage";

const ProtectedLayout = ({ currentPage, setCurrentPage, children }) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    {children}
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                <DashboardPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                <CoursesPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/discussions"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                <DiscussionsPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                <AnalyticsPage />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                <div className="flex-1 overflow-auto p-8">
                  Assignments Coming Soon
                </div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                <div className="flex-1 overflow-auto p-8">
                  Certificates Coming Soon
                </div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ProtectedLayout
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              >
                <div className="flex-1 overflow-auto p-8">
                  Settings Coming Soon
                </div>
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/auth/login"} />}
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
