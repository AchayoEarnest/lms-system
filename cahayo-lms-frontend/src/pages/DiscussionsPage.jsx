import React, { useState, useEffect } from "react";
import Header from "../components/Common/Header";
import { discussionService } from "../services/discussionService";

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await discussionService.getDiscussions();
      setDiscussions(response.data.results || response.data);
    } catch (error) {
      console.error("Error fetching discussions:", error);
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

  return (
    <div className="flex-1 overflow-auto">
      <Header
        title="Discussion Forum"
        subtitle="Collaborate with other learners"
      />
      <main className="p-8 max-w-4xl mx-auto">
        <button className="mb-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
          Start New Discussion
        </button>

        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {discussion.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Started by {discussion.created_by || "User"}
              </p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>💬 {discussion.replies || 0} replies</span>
                <span>👁️ {discussion.views || 0} views</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DiscussionsPage;
