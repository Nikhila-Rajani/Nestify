"use client"
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../../Redux/Store/Store"
import api from "../../../axios/userInstances"
import { logoutUser } from "../../../Redux/User/userSlice"

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)

  const [show, setShow] = useState(true) // control navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll handler for hide/show
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShow(false) // scrolling down → hide
      } else {
        setShow(true) // scrolling up → show
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Login
  const handleLoginClick = () => {
    navigate("/login")
  }

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/logout")
      dispatch(logoutUser())
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full bg-white shadow-md sticky top-0 z-50"
    >
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.1 }} className="text-2xl font-bold text-red-500 cursor-pointer">
          Nestify
        </motion.div>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          {["Homes", "Experiences", "Services", "Become a Host"].map((item, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="cursor-pointer hover:text-red-500"
            >
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Login / Logout */}
        <div className="flex gap-3">
          {!user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition"
              onClick={handleLoginClick}
            >
              Login
            </motion.button>
          )}

          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500 transition"
              onClick={handleLogout}
            >
              Logout
            </motion.button>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-5xl mx-auto bg-white shadow-lg rounded-full flex items-center justify-between px-6 py-3 mt-4 hover:shadow-xl transition"
      >
        <div className="flex-1 border-r px-4">
          <p className="text-xs font-semibold text-gray-500">Where</p>
          <input type="text" placeholder="Search destination" className="w-full outline-none text-sm" />
        </div>
        <div className="flex-1 border-r px-4">
          <p className="text-xs font-semibold text-gray-500">Check In</p>
          <input type="date" className="w-full outline-none text-sm" />
        </div>
        <div className="flex-1 border-r px-4">
          <p className="text-xs font-semibold text-gray-500">Check Out</p>
          <input type="date" className="w-full outline-none text-sm" />
        </div>
        <div className="flex-1 px-4">
          <p className="text-xs font-semibold text-gray-500">Who</p>
          <input type="number" min="1" placeholder="Add guests" className="w-full outline-none text-sm" />
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-red-500 p-3 rounded-full text-white hover:bg-red-600 transition"
        >
          <Search size={20} />
        </motion.button>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
