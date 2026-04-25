import axios from 'axios';
import type { RegisterRequest, LoginRequest } from '@/types/auth';
const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';
import { User } from '@/types/user';

const API = axios.create({
  baseURL: baseURL,
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
