import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import * as api from '../services/authAPI';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [resendMsg, setResendMsg] = useState<string | null>(null);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  const email = localStorage.getItem('signupEmail') || '';

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError('No email found. Please sign up again.');
      return;
    }

    try {
      const res = await api.verifyOTP(email, otp);
      localStorage.removeItem('signupEmail');
      localStorage.setItem('token', res.data.token || 'temp-token');
      localStorage.setItem('role', res.data.user?.role || 'user');
      setMessage('OTP verified successfully! Redirecting...');
      setTimeout(() => {
        navigate(res.data.user?.role === 'admin' ? '/admin/users' : '/login');
      }, 1500);
    } catch (err) {
      setError((err as any).response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    try {
      await api.resendOTP(email);
      setResendMsg('OTP resent to your email.');
      setTimer(30);
    } catch (err) {
      setError((err as any).response?.data?.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#D23166]">Verify OTP</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {message && <p className="text-green-500 text-center mb-2">{message}</p>}
        {resendMsg && <p className="text-green-600 text-center mb-2">{resendMsg}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            label="Enter OTP"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-[#D23166] hover:bg-[#b61c52] text-white">
            Verify
          </Button>
        </form>

        <div className="mt-4 text-center">
          {timer > 0 ? (
            <p className="text-gray-500">Resend OTP in {timer} seconds</p>
          ) : (
            <button
              onClick={handleResend}
              className="text-[#D23166] font-semibold hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
