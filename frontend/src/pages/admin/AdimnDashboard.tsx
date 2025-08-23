import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Book, BarChart2, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminSideBar from '../../components/admin/AdminSideBar';



const AdminDashBoard: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setShowFooter(scrollY > 50); // Show footer after 50px scroll
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const stats = [
    { title: "Total Bookings", value: "245", icon: Book },
    { title: "Active Users", value: "1,320", icon: Users },
    { title: "Revenue", value: "$45,780", icon: BarChart2 },
  ];

  const recentBookings = [
    { id: "B001", hotel: "Luxury Suite", date: "2025-08-20", status: "Confirmed" },
    { id: "B002", hotel: "Ocean View", date: "2025-08-21", status: "Pending" },
    { id: "B003", hotel: "City Penthouse", date: "2025-08-22", status: "Cancelled" },
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1564501045420-2582e0f7a7e6)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>

      <AdminSideBar/>

      {/* Main Content */}
      <div className="ml-64 p-6 relative z-10 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <button
            onClick={handleLoginClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-lg shadow-lg"
            >
              <stat.icon className="text-gold-500 w-8 h-8 mb-2" />
              <h3 className="text-gray-700 font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-700 mb-4">Recent Bookings</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2">ID</th>
                <th className="py-2">Hotel</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2">{booking.id}</td>
                  <td className="py-2">{booking.hotel}</td>
                  <td className="py-2">{booking.date}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${booking.status === 'Confirmed' ? 'bg-green-200 text-green-800' : booking.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showFooter ? 0 : 100, opacity: showFooter ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md border-t border-gray-200 py-3 w-full max-w-sm mx-auto fixed bottom-0"
      >
        <div className="px-4 flex flex-wrap gap-3 justify-center">
          <a href="#" className="text-gray-600 hover:text-gold-500 text-sm font-medium transition-colors duration-200">Support</a>
          <a href="#" className="text-gray-600 hover:text-gold-500 text-sm font-medium transition-colors duration-200">About</a>
          <a href="#" className="text-gray-600 hover:text-gold-500 text-sm font-medium transition-colors duration-200">Bookings</a>
        </div>
        <div className="px-4 py-1 text-center text-xs text-gray-500">
          <p>© 2025 Nestify Hotels. <a href="#" className="text-gold-500 hover:text-gold-700">Privacy</a> - <a href="#" className="text-gold-500 hover:text-gold-700">Terms</a></p>
        </div>
      </motion.footer>
    </div>
  );
};

export default AdminDashBoard;