import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import * as api from '../services/authAPI';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.forgotPassword(email);
      setMessage('OTP sent to your email. Please check.');
      localStorage.setItem('resetEmail', email);
      setTimeout(() => {
        navigate('/reset-password');
      }, 1000);
    } catch (err) {
      setError((err as any).response?.data?.message || 'Something went wrong');
      setMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#D23166]">Forgot Password</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button type="submit" className="w-full bg-[#D23166] hover:bg-[#b61c52] text-white">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
