"use client"
import React from "react"
import { motion } from "framer-motion"

const Inspiration: React.FC = () => {
  const categories = [
    { title: "Beach Getaways", image: "/beach.jpg" },
    { title: "Mountain Escapes", image: "/mountain.jpg" },
    { title: "City Breaks", image: "/city.jpg" },
    { title: "Countryside", image: "/countryside.jpg" },
  ]

  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">Inspiration for your next trip</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 bg-red-500 text-white font-semibold">
              {item.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Inspiration
