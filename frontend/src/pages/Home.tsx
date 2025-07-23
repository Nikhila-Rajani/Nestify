// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
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
    </div>
  );
};

export default Home;
