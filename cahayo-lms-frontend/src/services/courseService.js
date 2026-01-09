import api from "./api";

export const courseService = {
  getAllCourses: (filters = {}) => api.get("courses/", { params: filters }),

  getCourseById: (id) => api.get(`courses/${id}/`),

  enrollCourse: (courseId) => api.post(`courses/${courseId}/enroll/`),

  getMyProgress: (courseId) => api.get(`courses/${courseId}/my_progress/`),

  getEnrollments: () => api.get("enrollments/"),

  getModules: (courseId) =>
    api.get("modules/", { params: { course_id: courseId } }),

  getLessons: (moduleId) =>
    api.get("lessons/", { params: { module_id: moduleId } }),
};
