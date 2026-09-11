import api from "./axios";

const searchApi = {
  globalSearch: async (query) => {
    const response = await api.get(
      `/search?q=${encodeURIComponent(query)}`
    );

    return response.data;
  },
};

export default searchApi;