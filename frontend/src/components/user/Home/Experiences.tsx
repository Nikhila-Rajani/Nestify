"use client"
import React from "react"
import { motion } from "framer-motion"

const Experiences: React.FC = () => {
  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">Discover Nestify Experiences</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="\experience-2.jpeg"
            alt="Experience"
            className="w-full h-60 object-cover"
          />
          <div className="p-4 bg-white font-semibold">Things to do near you</div>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/experience-2.jpeg"
            alt="Experience"
            className="w-full h-60 object-cover"
          />
          <div className="p-4 bg-white font-semibold">Unique Online Experiences</div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experiences
