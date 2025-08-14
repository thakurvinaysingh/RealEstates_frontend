// src/api/user.js
import api from '../lib/api';
const unwrap = (r) => r.data;

export const userApi = {
  getMe: () => api.get('/user/me').then(unwrap),
  updateMe: (formDataOrObj) => {
    const isForm = formDataOrObj instanceof FormData;
    const fd = isForm ? formDataOrObj : new FormData();
    if (!isForm) for (const [k,v] of Object.entries(formDataOrObj||{})) fd.append(k, v);
    return api.patch('/user/me', fd, { headers: { 'Content-Type': 'multipart/form-data' } }).then(unwrap);
  },
  changePassword: (body) => api.patch('/user/me/password', body).then(unwrap),
  getMyInvestments: (params) => api.get('/user/me/investments', { params }).then(unwrap),
  getMyStats: () => api.get('/user/me/stats').then(unwrap),
};
