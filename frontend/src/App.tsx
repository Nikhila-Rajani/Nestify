// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import VerifyOTP from './pages/VerifyOtp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home'
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminDashboard from './pages/AdimnDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOTP />} /><Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      {/* <Route path='/home' element = {<Home/>}/> */}
      <Route path="/admin/users" element={
        <ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>
      } />

    </Routes>
  );
}

export default App;
