import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const user = { userId: userData.userId, token: userData.token };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User logged in:", user); // 추가된 로그
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out"); // 추가된 로그
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
