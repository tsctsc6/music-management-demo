import type { ApiResponse } from "./../types/apiResponse";
import type { LoginRequest, LoginResponse } from "../types/identity/login";
import type { LogoutResponse } from "../types/identity/logout";
import apiClient from "../web-api/axiosConfig";

export const identityService = {
  login: async (args: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/identity/login",
      args
    );
    return response.data;
  },
  logout: async (): Promise<ApiResponse<LogoutResponse>> => {
    const response = await apiClient.post<ApiResponse<LogoutResponse>>(
      "/identity/logout",
      {}
    );
    return response.data;
  },
};
