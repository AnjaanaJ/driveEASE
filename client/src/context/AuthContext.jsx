import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import PreLoader from "../components/shared/PreLoader";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_LOADING_TIME = 4000;

    const token = localStorage.getItem("token");
    if (!token) {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => setLoading(false), remaining);
      return;
    }

    axiosInstance
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user || res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

        setTimeout(() => setLoading(false), remaining);
      });
  }, []);

  const login = async (email, password) => {
    const res = await axiosInstance.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user || res.data);

    return res.data;
  };

  const register = async (name, email, password, role) => {
    const res = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
      role,
    });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user || res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, register, logout }}
    >
      {loading ? <PreLoader /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
