import React from "react";

const AnswerOption = ({ answer, onSelect }) => (
  <button
    onClick={onSelect}
    className="w-full p-4 border-2 border-gray-200 rounded-lg text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
  >
    <input type="radio" className="mr-3" />
    {answer?.text}
  </button>
);

export default AnswerOption;
