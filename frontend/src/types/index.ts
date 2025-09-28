export interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Diary {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface DiaryListResponse {
  data: Diary[];
  total: number;
}
