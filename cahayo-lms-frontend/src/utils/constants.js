export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1";

export const COURSE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const ENROLLMENT_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  DROPPED: "dropped",
};

// FILE: src/utils/helpers.js
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const calculateProgress = (completed, total) => {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};
