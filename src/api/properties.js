import api from "../lib/api";

export const listProperties = (params) => api.get("/properties", { params });
// Detail by slug (SEO)
export const getPropertyBySlug = (slug) => api.get(`/properties/slug/${slug}`);
// Fallback by id if needed
export const getPropertyById = (id) => api.get(`/properties/${id}`);
