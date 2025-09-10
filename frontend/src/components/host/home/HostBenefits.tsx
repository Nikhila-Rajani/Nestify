import React from "react"
import { ShieldCheck, Users, Wallet } from "lucide-react"

const HostBenefits: React.FC = () => {
  const benefits = [
    {
      icon: <Wallet className="h-8 w-8 text-red-500" />,
      title: "Earn Extra Income",
      description: "Turn your space into a steady income stream.",
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Meet New People",
      description: "Connect with travelers from all over the world.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-red-500" />,
      title: "Safety First",
      description: "Verified users, secure payments, and support 24/7.",
    },
  ]

  return (
    <section className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">Why Host With Us?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <div className="flex justify-center">{benefit.icon}</div>
            <h3 className="mt-4 font-semibold text-lg">{benefit.title}</h3>
            <p className="text-gray-600 mt-2">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HostBenefits
