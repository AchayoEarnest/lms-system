import React from "react";
import AnswerOption from "./AnswerOption";

const QuizQuestion = ({ question, onAnswer }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
    <h3 className="text-xl font-bold text-gray-900 mb-6">{question?.text}</h3>
    <div className="space-y-3">
      {question?.answers?.map((answer) => (
        <AnswerOption
          key={answer.id}
          answer={answer}
          onSelect={() => onAnswer(answer.id)}
        />
      ))}
    </div>
  </div>
);

export default QuizQuestion;
