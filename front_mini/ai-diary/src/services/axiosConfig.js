import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 서버의 기본 URL로 변경
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청을 보내기 전에 실행되는 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
