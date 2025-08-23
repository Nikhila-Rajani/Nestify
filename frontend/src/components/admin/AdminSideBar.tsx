import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import AdminApi from '../../axios/adminInstances';
import { adminLogout } from '../../Redux/admin/adminSlice';
import { useDispatch,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminSideBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await AdminApi.post("/logout");
      dispatch(adminLogout());
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const sidebarVariants = {
    hidden: { x: -250 },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };
  return (
    <div>
        {/* Sidebar */}
      <motion.nav
        variants={sidebarVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-64 bg-gray-800 text-white h-screen p-6 fixed"
      >
        <h2 className="text-2xl font-bold mb-6">Nestify Admin</h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
          <li className="hover:bg-gray-700 p-2 rounded">Bookings</li>
          <li className="hover:bg-gray-700 p-2 rounded" onClick={()=>navigate("/admin/users")}>Users</li>
          <li className="hover:bg-gray-700 p-2 rounded">Reports</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={handleLogout}>
            <LogOut className="inline mr-2" /> Logout
          </li>
        </ul>
      </motion.nav>
    </div>
  )
}

export default AdminSideBar