import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import * as api from '../services/authAPI';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const email = localStorage.getItem('resetEmail') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('No email found. Please start from the Forgot Password page.');
      return;
    }

    try {
      await api.resetPassword(email, otp, newPassword);
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        localStorage.removeItem('resetEmail');
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError((err as any).response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#D23166]">Reset Password</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-[#D23166] hover:bg-[#b61c52] text-white">
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
