import { motion } from "framer-motion"
import {
  Home,
  BookOpen,
  Calendar,
  Users,
  DollarSign,
  ClipboardCheck,
  LogOut,
  Building,
} from "lucide-react"
import AdminApi from "../../axios/adminInstances"
import { adminLogout } from "../../Redux/admin/adminSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const AdminSideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await AdminApi.post("/logout")
      dispatch(adminLogout())
      navigate("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const sidebarVariants = {
    hidden: { x: -200 },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  }

  const menuItems = [
    { label: "Dashboard", icon: Home, path: "/admin/dashboard" },
    { label: "My Listing", icon: BookOpen, path: "/admin/listings" },
    { label: "Bookings", icon: Calendar, path: "/admin/bookings" },
    { label: "Hosts", icon: Building, path: "/admin/hosts" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Earnings", icon: DollarSign, path: "/admin/earnings" },
    { label: "Host Requests", icon: ClipboardCheck, path: "/admin/host-requests" },
  ]

  return (
    <motion.nav
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="relative z-20 w-64 bg-gradient-to-b from-red-500 to-orange-500 text-white h-screen p-6 fixed shadow-md"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold mb-10">Nestify</h2>

      {/* Menu Items */}
      <ul className="space-y-5">
        {menuItems.map((item, i) => (
          <motion.li
            key={item.label}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-600 transition-colors font-medium"
            onClick={() => navigate(item.path)}
          >
            <item.icon className="w-5 h-5" /> {item.label}
          </motion.li>
        ))}

        {/* Logout */}
        <motion.li
          custom={menuItems.length}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-3 px-3 py-2 mt-6 rounded-md cursor-pointer hover:bg-white hover:text-red-600 transition-colors font-medium"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" /> Logout
        </motion.li>
      </ul>
    </motion.nav>
  )
}

export default AdminSideBar
