"use client"
import React from "react"
import { motion } from "framer-motion"
import Button from "../../CommonComponents/Button"


const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[500px]">
      <img
        src="/Hero.jpg"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Not sure where to go? Perfect.
        </motion.h2>
        <Button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200">
          Explore
        </Button>
      </div>
    </section>
  )
}

export default Hero
