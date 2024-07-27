import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem("token", userData.token);
      axiosInstance
        .get("/api/auth/user", {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((response) => {
          setUser(response.data);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Failed to fetch user after login:", error);
          localStorage.removeItem("token");
          setUser(null);
        });
    } else {
      console.error("Invalid login response:", userData);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
