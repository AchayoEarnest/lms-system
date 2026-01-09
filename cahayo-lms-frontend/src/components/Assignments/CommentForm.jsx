import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4 resize-none h-24"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentForm;
