// src/api/authAPI.ts
import type { AxiosResponse } from 'axios';
import api from '../services/axiosInstance';

interface AuthResponse {
  message: string;
  token?: string;
  user?: { email: string; role: string };
}

interface MessageResponse {
  message: string;
}

export const login = (email: string, password: string): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/login', { email, password });

export const signup = (email: string, password: string, fullName: string): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/signup', { email, password, fullName });

export const verifyOTP = (email: string, otp: string): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/verify-otp', { email, otp });

export const resendOTP = (email: string): Promise<AxiosResponse<MessageResponse>> =>
  api.post('/resend-otp', { email });

export const forgotPassword = (email: string): Promise<AxiosResponse<MessageResponse>> =>
  api.post('/forgot-password', { email });

export const resetPassword = (
  email: string,
  otp: string,
  newPassword: string
): Promise<AxiosResponse<AuthResponse>> =>
  api.post('/reset-password', { email, otp, newPassword });
