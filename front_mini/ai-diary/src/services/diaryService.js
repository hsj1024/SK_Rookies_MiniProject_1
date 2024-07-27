import axiosInstance from "./axiosConfig";

export const createDiary = async (title, content) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      "/api/diaries",
      { title, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create diary:", error);
    throw error;
  }
};

export const getDiariesByUser = async (userId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axiosInstance.get(`/api/diaries/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get diaries:", error);
    throw error;
  }
};
