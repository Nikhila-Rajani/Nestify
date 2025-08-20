// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import api from '../../axios/userInstances';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/User/userSlice';


const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to Nestify</h1>
      <button
        onClick={handleLoginClick}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        LogOut
      </button>
    </div>
  );
};

export default Home;
