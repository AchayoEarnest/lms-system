import React from "react";

const LessonPlayer = ({ lesson }) => (
  <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
    <video src={lesson?.videoUrl} controls className="w-full h-full">
      Your browser does not support the video tag.
    </video>
  </div>
);

export default LessonPlayer;
