import React from "react";
import { MessageCircle, Eye } from "lucide-react";

const DiscussionCard = ({ discussion, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer"
  >
    <h3 className="text-lg font-bold text-gray-900 mb-2">
      {discussion?.title}
    </h3>
    <p className="text-gray-600 text-sm mb-4">
      Started by {discussion?.author}
    </p>
    <div className="flex justify-between text-sm text-gray-600">
      <span className="flex items-center gap-1">
        <MessageCircle size={16} /> {discussion?.replies} replies
      </span>
      <span className="flex items-center gap-1">
        <Eye size={16} /> {discussion?.views} views
      </span>
    </div>
  </div>
);

export default DiscussionCard;
