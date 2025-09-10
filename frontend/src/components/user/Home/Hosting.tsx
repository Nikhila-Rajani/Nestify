"use client"
import React from "react"
import Button from "../../CommonComponents/Button"


const Hosting: React.FC = () => {
  return (
    <section className="px-6 py-12">
      <div className="bg-gray-100 rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
        <img
          src="/host.jpg"
          alt="Hosting"
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div className="p-6 md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">Questions about hosting?</h3>
          <p className="mb-4">
            Join thousands of hosts and share your home with travelers worldwide.
          </p>
          <Button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hosting
