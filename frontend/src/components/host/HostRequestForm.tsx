"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Upload, MapPin, Wifi, Car, Tv, Snowflake, Utensils, Droplet, Dumbbell, CigaretteOff } from "lucide-react"

interface HostRequestData {
  name: string
  email: string
  phone: string
  location: string
  amenities: string[]
  photos: File[]
  documents: File[]
}

const HostRequest: React.FC = () => {
  const [formData, setFormData] = useState<HostRequestData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    amenities: [],
    photos: [],
    documents: [],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }))
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "photos" | "documents",
  ) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], ...Array.from(e.target.files)],
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitted Data:", formData)
  }

  // const fadeUp = {
  //   hidden: { opacity: 0, y: 40 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  // }

  // 🟠 List of amenities with labels + icons
  const amenitiesList = [
    { label: "WiFi", icon: <Wifi className="w-4 h-4" /> },
    { label: "Parking", icon: <Car className="w-4 h-4" /> },
    { label: "TV", icon: <Tv className="w-4 h-4" /> },
    { label: "Air Conditioning", icon: <Snowflake className="w-4 h-4" /> },
    { label: "Kitchen", icon: <Utensils className="w-4 h-4" /> },
    { label: "Water Heater", icon: <Droplet className="w-4 h-4" /> },
    { label: "Gym", icon: <Dumbbell className="w-4 h-4" /> },
    { label: "No Smoking", icon: <CigaretteOff className="w-4 h-4" /> },
  ]

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      // variants={fadeUp}
      className="min-h-screen bg-gradient-to-br from-red-500 via-orange-400 to-yellow-300 flex items-center justify-center py-10 px-4"
    >
      <motion.form
        onSubmit={handleSubmit}
        // variants={fadeUp}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Become a Host
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Fill out the details to list your stay and start welcoming guests 🌍
        </p>

        {/* Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-red-400 focus:outline-none"
          />
          <div className="flex items-center border p-3 rounded-xl focus-within:ring-2 focus-within:ring-red-400">
            <MapPin className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => toggleAmenity(item.label)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 justify-center ${
                  formData.amenities.includes(item.label)
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* File Uploads */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Upload Photos</h3>
          <label className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-red-400 transition">
            <Upload className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Choose Photos</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e, "photos")}
            />
          </label>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Upload Documents</h3>
          <label className="flex items-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-red-400 transition">
            <Upload className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">Upload ID Proof (Aadhar, etc.)</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e, "documents")}
            />
          </label>
        </div>

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-xl font-semibold shadow-md"
        >
          Submit Request
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

export default HostRequest
