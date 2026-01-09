import api from "./api";

export const notificationService = {
  getNotifications: () => api.get("notifications/"),

  markAsRead: (notificationId) =>
    api.post(`notifications/${notificationId}/mark_as_read/`),

  markAllAsRead: () => api.post("notifications/mark_all_as_read/"),

  getUnreadCount: () => api.get("notifications/unread_count/"),

  getAnnouncements: (courseId) =>
    api.get("announcements/", { params: { course_id: courseId } }),

  getEmailPreferences: () => api.get("email-preferences/"),

  updateEmailPreferences: (data) => api.put("email-preferences/", data),
};
