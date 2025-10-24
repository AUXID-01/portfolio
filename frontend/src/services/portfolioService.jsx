import api from './api';

export const portfolioService = {
  getAll: async (page = 1, limit = 10) => {
    const response = await api.get(`/portfolios?page=${page}&limit=${limit}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
  },

  getBySlug: async (slug) => {
    const response = await api.get(`/portfolios/slug/${slug}`);
    return response.data;
  },

  getFeatured: async () => {
    const response = await api.get('/portfolios/featured');
    return response.data;
  },

  create: async (portfolioData) => {
    const response = await api.post('/portfolios', portfolioData);
    return response.data;
  },

  update: async (id, portfolioData) => {
    const response = await api.put(`/portfolios/${id}`, portfolioData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/portfolios/${id}`);
    return response.data;
  },

  addSection: async (portfolioId, sectionData) => {
    const response = await api.post(`/portfolios/${portfolioId}/sections`, sectionData);
    return response.data;
  },

  updateSection: async (portfolioId, sectionId, sectionData) => {
    const response = await api.put(`/portfolios/${portfolioId}/sections/${sectionId}`, sectionData);
    return response.data;
  },

  deleteSection: async (portfolioId, sectionId) => {
    const response = await api.delete(`/portfolios/${portfolioId}/sections/${sectionId}`);
    return response.data;
  },

  exportPortfolio: async (portfolioId) => {
    const response = await api.get(`/portfolios/${portfolioId}/export`, {
      responseType: 'blob'
    });
    return response.data;
  }
};
