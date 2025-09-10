"use client"
import type React from "react"
import { motion } from "framer-motion"
import Navbar from "../../components/user/Home/NavBar"
import Hero from "../../components/user/Home/Hero"
import Inspiration from "../../components/user/Home/Insptration"
import Experiences from "../../components/user/Home/Experiences"
import Hosting from "../../components/user/Home/Hosting"
import Footer from "../../components/user/Home/Footer"


const UserHomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <Navbar />
      <Hero />
      <Inspiration />
      <Experiences />
      <Hosting />
      <Footer />
    </motion.div>
  )
}

export default UserHomePage
