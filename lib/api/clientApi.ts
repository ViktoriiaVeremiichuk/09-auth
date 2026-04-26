import { api as baseApi } from '@/lib/api/api';
import type { RegisterRequest, LoginRequest } from '@/types/auth';
import { User } from '@/types/user';
import type { Note, CreateNote } from '@/types/note';
import type { NotesResponse } from '@/lib/api/api';

export const api = baseApi;

export const register = async (data: RegisterRequest) => {
  const res = await api.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await api.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const checkSession = async () => {
  const { data } = await api.get<{ success: boolean }>('/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (userData: Partial<User>) => {
  const { data } = await api.patch<User>('/users/me', userData);
  return data;
};

export const fetchNotes = async (params?: { page?: number; perPage?: number; search?: string; tag?: string }) => {
  const { data } = await api.get<NotesResponse>('/notes', { params });
  return data;
};

export const fetchNoteById = async (noteId: string) => {
  const { data } = await api.get<Note>(`/notes/${noteId}`);
  return data;
};

export const createNote = async (payload: CreateNote) => {
  const { data } = await api.post<Note>('/notes', payload);
  return data;
};

export const deleteNote = async (noteId: string) => {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
};