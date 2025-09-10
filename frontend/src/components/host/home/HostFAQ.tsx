import React, { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Do I need to pay to become a host?",
    answer: "No, hosting is free to join. You only earn when guests book your property.",
  },
  {
    question: "How do I get verified?",
    answer: "Once you submit your request, our team reviews it and verifies your details.",
  },
  {
    question: "Is my property insured?",
    answer: "Yes, we provide host protection for damages and secure payments.",
  },
]

const HostFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{faq.question}</h3>
              <ChevronDown className={`h-5 w-5 transform transition ${openIndex === idx ? "rotate-180" : ""}`} />
            </div>
            {openIndex === idx && <p className="text-gray-600 mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default HostFAQ
