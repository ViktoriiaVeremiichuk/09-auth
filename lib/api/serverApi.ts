import axios from 'axios';
import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';
import type { FetchNotesParams } from '@/types/note';
import type { CheckSessionResponse } from '@/types/auth';
import type { NotesResponse } from '@/lib/api/api';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
});

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<NotesResponse> => {
  const headers = await getAuthHeaders();
  const { data } = await api.get<NotesResponse>('/notes', { params, headers });
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const headers = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${noteId}`, { headers });
  return data;
};

export const getMe = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User>('/users/me', { headers });
  return data;
};

export const checkSession = async (): Promise<AxiosResponse<CheckSessionResponse>> => {
  const headers = await getAuthHeaders();
  const response = await api.get<CheckSessionResponse>('/auth/session', {
    headers,
  });
  return response;
};
