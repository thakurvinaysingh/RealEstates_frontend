import api from "../lib/api";

export const buySlots = (propertyId, slots) =>
  api.post(`/investments/${propertyId}/buy-slot`, { slots });

export const myInvestments = () => api.get("/investments/my");
export const getInvestmentById = (id) => api.get(`/investments/${id}`);
