import { createContext, useContext, useEffect, useState } from "react";
import { myInvestments } from "../api/investments";
import { useAuth } from "./AuthContext";

const DashboardContext = createContext(null);
export const useDashboard = () => useContext(DashboardContext);

export default function DashboardProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const fetchMyInvestments = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await myInvestments();
      // backend populates property title/location/images — great for cards/tables
      setInvestments(data || []);
    } catch (e) {
      setError(e.message || "Failed to load investments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyInvestments();
    // re-fetch when auth changes
  }, [isAuthenticated]);

  return (
    <DashboardContext.Provider value={{ investments, loading, error, refetch: fetchMyInvestments }}>
      {children}
    </DashboardContext.Provider>
  );
}
