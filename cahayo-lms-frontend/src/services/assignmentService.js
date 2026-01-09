import api from './api';

export const assignmentService = {
  getAssignments: () => api.get('assignments/'),

  getAssignmentById: (id) => api.get(`assignments/${id}/`),

  getSubmissions: () => api.get('submissions/'),

  submitAssignment: (assignmentId, files) => {
    const formData = new FormData();
    formData.append('assignment_id', assignmentId);
    files.forEach((file) => formData.append('files', file));

    return api.post('submissions/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getSubmissionFeedback: (submissionId) => api.get(`submissions/${submissionId}/`),
};