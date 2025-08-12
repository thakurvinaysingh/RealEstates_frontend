import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;
  const isAdmin = user?.role === "admin";

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // shape: { _id, name, email, role, token }
      setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify({ _id: data._id, name: data.name, email: data.email, role: data.role }));
      localStorage.setItem("token", data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    // { name, email, password, countryCode, phoneNumber }
    return api.post("/auth/register", payload);
  };

  const verifyEmail = async (email, otp) => {
    // returns { token } if you auto-login after verify
    const { data } = await api.post("/auth/verify", { email, otp });
    if (data?.token) {
      // optional: fetch /auth/me if you have it; or reuse existing cached user
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const value = useMemo(
    () => ({ user, token, isAuthenticated, isAdmin, loading, login, register, verifyEmail, logout }),
    [user, token, isAuthenticated, isAdmin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
