import api from "./api";

export const analyticsService = {
  getMyAnalytics: () => api.get("learner-analytics/my_analytics/"),

  getProgressReport: () => api.get("learner-analytics/progress_report/"),

  getCourseAnalytics: (courseId) =>
    api.get("course-analytics/course_performance/", {
      params: { course_id: courseId },
    }),
};
