import api from "../shared/api/axios";

const authService = {
  register: (data) =>
    api.post("/auth/register", data),

  login: (data) =>
    api.post("/auth/login", data),

  logout: () =>
    api.post("/auth/logout"),

  forgotPassword: (email) =>
    api.post("/auth/forgot-password", { email }),

  resetPassword: (token, password) =>
    api.post(`/auth/reset-password/${token}`, {
      password,
    }),

  changePassword: (data) =>
    api.post("/auth/change-password", data),

  profile: () =>
    api.get("/auth/profile"),
};

export default authService;