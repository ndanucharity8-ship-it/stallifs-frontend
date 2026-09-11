import api from "../shared/api/axios";

const applicationService = {
  apply: (data) =>
    api.post("/applications", data),

  myApplications: () =>
    api.get("/applications/my"),

  getAll: () =>
    api.get("/applications"),

  getOne: (id) =>
    api.get(`/applications/${id}`),

  approve: (id) =>
    api.put(`/applications/${id}/approve`),

  reject: (id, reason) =>
    api.put(`/applications/${id}/reject`, {
      reason,
    }),
};

export default applicationService;