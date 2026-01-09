import api from "./api";

export const discussionService = {
  getDiscussions: (courseId = null) =>
    api.get("discussions/", { params: { course_id: courseId } }),

  getDiscussionById: (id) => api.get(`discussions/${id}/`),

  createDiscussion: (title, content, courseId) =>
    api.post("discussions/", { title, content, course_id: courseId }),

  getComments: (discussionId) =>
    api.get("comments/", { params: { discussion_id: discussionId } }),

  addComment: (discussionId, content, parentId = null) =>
    api.post("comments/", {
      discussion_id: discussionId,
      content,
      parent_id: parentId,
    }),

  likeComment: (commentId) => api.post(`comments/${commentId}/like/`),
};
