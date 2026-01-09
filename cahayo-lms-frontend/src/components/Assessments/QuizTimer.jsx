import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const QuizTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 text-lg font-bold text-red-600">
      <Clock size={20} />
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default QuizTimer;
