import axios, { AxiosError } from "axios";
import { navigateToLogin } from "../navigation";

const apiUrl = import.meta.env.MUSIC_MANAGEMENT_DEMO_API_BASE_URL;

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: apiUrl || "http://127.0.0.1:5095/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 添加认证 token
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // 处理未授权
      localStorage.removeItem("jwt");
      navigateToLogin();
      return Promise.reject(new Error("Unauthorized"));
    }
    if (error.response?.status === 403) {
      // 处理禁止访问
      return Promise.reject(new Error("Forbidden"));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
