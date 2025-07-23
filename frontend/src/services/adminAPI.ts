// src/api/adminAPI.ts
import type { AxiosResponse } from 'axios';
import api from '../services/axiosInstance';

interface User {
  email: string;
  role: string;
}

interface UsersResponse {
  users: User[];
}

interface MessageResponse {
  message: string;
}

export const getUsers = (): Promise<AxiosResponse<UsersResponse>> => api.get('/users');

export const blockUser = (email: string): Promise<AxiosResponse<MessageResponse>> =>
  api.post('/users/block', { email });

export const unblockUser = (email: string): Promise<AxiosResponse<MessageResponse>> =>
  api.post('/users/unblock', { email });
