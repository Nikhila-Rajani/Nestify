"use client"
import React from "react"

const Footer: React.FC = () => {
  const sections = ["About", "Community", "Host", "Support"]

  return (
    <footer className="bg-gray-100 py-12 px-6 text-sm text-gray-700">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sections.map((section, i) => (
          <div key={i}>
            <h4 className="font-bold mb-3">{section}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-black">How Nestify works</a></li>
              <li><a href="#" className="hover:text-black">Careers</a></li>
              <li><a href="#" className="hover:text-black">Investors</a></li>
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-500">© 2025 Nestify, Inc.</div>
    </footer>
  )
}

export default Footer
