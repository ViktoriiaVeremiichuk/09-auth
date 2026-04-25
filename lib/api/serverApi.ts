import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}


const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  };
};

export const API = axios.create({
  baseURL: baseURL,
});


export const fetchNotes = async (params: FetchNotesParams={}) => {
  const headers = await getAuthHeaders();
  const { data } = await API.get('/notes', { params, headers });
  return data;
};

export const getMe = async () => {
  const headers = await getAuthHeaders();
  const { data } = await API.get('/auth/users/me', { headers });
  return data;
};

export const fetchNoteById = async (noteId: string) => {
  const headers = await getAuthHeaders();
  const { data } = await API.get(`/notes/${noteId}`, { headers });
  return data;
};

export const checkSession = async () => {
  const headers = await getAuthHeaders();
  try {
    const { data } = await API.get('/auth/session', { headers });
    return data.success;
  } catch {
    return false;
  }
};