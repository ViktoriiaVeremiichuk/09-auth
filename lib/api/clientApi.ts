import axios from 'axios';
import type { RegisterRequest, LoginRequest } from '@/types/auth';
import { User } from '@/types/user';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const register = async (data: RegisterRequest) => {
  const res = await API.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await API.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await API.post<User>('/auth/logout');
};
