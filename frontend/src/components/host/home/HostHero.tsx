import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../../../Redux/Store/Store"

const HostHero: React.FC = () => {
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user.user)

  const handleBecomeHost = () => {
    navigate("/become-host")
  }

  // Simple smooth fade + zoom
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative bg-gradient-to-r from-red-500 to-orange-400 text-white text-center py-24 px-6"
    >
      <motion.h1
        variants={fadeIn}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Share your home, earn extra income
      </motion.h1>

      <motion.p variants={fadeIn} className="text-lg mb-8">
        Become a host and start welcoming guests from around the world.
      </motion.p>

      {user?.role === "host" ? (
        <motion.button
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/host/dashboard")}
          className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100"
        >
          Go to Dashboard
        </motion.button>
      ) : (
        <motion.button
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleBecomeHost}
          className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100"
        >
          Become a Host
        </motion.button>
      )}
    </motion.section>
  )
}

export default HostHero
