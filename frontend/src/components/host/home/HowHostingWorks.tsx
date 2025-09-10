import React from "react"
import { Home, ClipboardCheck, DollarSign } from "lucide-react"

const HowHostingWorks: React.FC = () => {
  const steps = [
    {
      icon: <Home className="h-12 w-12 text-red-500" />,
      title: "List Your Space",
      description: "Add details about your property, photos, and availability.",
    },
    {
      icon: <ClipboardCheck className="h-12 w-12 text-red-500" />,
      title: "Get Verified",
      description: "Our team will review your request and approve your listing.",
    },
    {
      icon: <DollarSign className="h-12 w-12 text-red-500" />,
      title: "Start Hosting",
      description: "Welcome guests, manage bookings, and earn income.",
    },
  ]

  return (
    <section className="py-16 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">How Hosting Works</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex flex-col items-center"
          >
            {step.icon}
            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HowHostingWorks
