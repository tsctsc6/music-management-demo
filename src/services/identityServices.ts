import type { ApiResponse } from "./../types/apiResponse";
import type { LoginRequest, LoginResponse } from "../types/identity/login";
import apiClient from "../web-api/axiosConfig";

export const identityService = {
  login: async (args: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/login",
      args
    );
    return response.data;
  },
};
