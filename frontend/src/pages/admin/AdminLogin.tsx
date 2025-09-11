import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { AiFillLock } from "react-icons/ai"
import { motion } from "framer-motion"
import type { AppDispatch, RootState } from "../../Redux/Store/Store"
import { adminLoginService } from "../../Api/adminApi"
import { adminLogin } from "../../Redux/admin/adminSlice"

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state: RootState) => state.admin)
  const [localError, setLocalError] = useState<string | null>(null)

  // Handle form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError(null)

    const { success, message, admin, accessToken, error } = await adminLoginService({
      email,
      password,
    })

    if (success && admin && accessToken) {
      const payload = {
        _id: admin._id,
        email: admin.email,
        accessToken,
      }
      dispatch(adminLogin(payload))
      navigate("/admin/dashboard")
      toast.success(message)
    } else {
      setLocalError(message)
    }
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-500 to-orange-400">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-white/20 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8 w-[400px]"
      >
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="Logo" className="h-14 mb-3 drop-shadow-md" />
          <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          <div className="text-red-500 bg-white p-3 rounded-full shadow-lg mt-3">
            <AiFillLock size={28} />
          </div>
        </div>

        {/* Error messages */}
        {localError && <p className="mb-4 text-center text-red-200">{localError}</p>}
        {error && !localError && <p className="mb-4 text-center text-red-200">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/80 shadow-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white/80 shadow-sm"
              required
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2 rounded-lg font-semibold shadow-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-red-500 to-orange-400 text-white hover:shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default AdminLogin
