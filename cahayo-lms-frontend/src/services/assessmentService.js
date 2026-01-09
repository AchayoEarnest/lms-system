import api from "./api";

export const assessmentService = {
  getQuizByLesson: (lessonId) =>
    api.get(`assessments/`, { params: { lesson_id: lessonId } }),

  startQuizAttempt: (quizId) => api.post(`quiz-attempts/`, { quiz_id: quizId }),

  submitAnswer: (attemptId, questionId, answer) =>
    api.post(`student-answers/`, {
      attempt_id: attemptId,
      question_id: questionId,
      selected_answer: answer,
    }),

  submitQuiz: (attemptId) => api.post(`quiz-attempts/${attemptId}/submit/`),

  getQuizResults: (attemptId) => api.get(`quiz-attempts/${attemptId}/`),
};
