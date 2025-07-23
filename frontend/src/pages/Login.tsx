import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import * as api from '../services/authAPI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.login(email, password);
      localStorage.setItem('token', res.data.token || 'temp-token');
      localStorage.setItem('role', res.data.user?.role || 'user');
      navigate(res.data.user?.role === 'admin' ? '/admin/users' : '/');
    } catch (err) {
      setError((err as any).response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-4xl font-bold mb-8 text-center text-[#D23166]">Login to Nestify</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-sm text-right mt-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#D23166] hover:underline"
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#D23166] hover:bg-[#bb1c55] text-white py-2 rounded-md">
            Login
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-[#D23166] hover:underline">
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mt-3">
          <span className="text-sm text-gray-600">Don’t have an account? </span>
          <Link to="/signup" className="text-sm text-[#D23166] font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
