export interface LoginRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
