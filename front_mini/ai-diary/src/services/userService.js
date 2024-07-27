import axiosInstance from "./axiosConfig";

export const signup = async (username, password, email) => {
  try {
    const response = await axiosInstance.post("/api/users/signup", {
      username,
      password,
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to sign up:", error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};
