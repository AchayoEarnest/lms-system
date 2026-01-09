import api from "./api";

export const authService = {
  login: (email, password) => api.post("token/", { email, password }),

  signup: (username, email, password, first_name, last_name) =>
    api.post("users/", {
      username,
      email,
      password,
      first_name,
      last_name,
    }),

  getMe: () => api.get("users/me/"),

  updateProfile: (data) => api.put("users/update_profile/", data),

  changePassword: (old_password, new_password) =>
    api.post("users/change_password/", { old_password, new_password }),

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
};
