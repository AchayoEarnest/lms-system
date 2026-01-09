import api from "./api";

export const lessonService = {
  getLessonById: (id) => api.get(`lessons/${id}/`),

  getLessonProgress: (lessonId) =>
    api.get("lesson-progress/", { params: { lesson_id: lessonId } }),

  markLessonComplete: (lessonId, timeSpent = 0) =>
    api.post("lesson-progress/mark_complete/", {
      lesson_id: lessonId,
      time_spent_minutes: timeSpent,
    }),

  updateProgress: (lessonId, progressPercentage, timeSpent) =>
    api.post("lesson-progress/update_progress/", {
      lesson_id: lessonId,
      progress_percentage: progressPercentage,
      time_spent_minutes: timeSpent,
    }),
};
