// src/pages/HostHome.tsx
"use client"

import HostBenefits from "../../components/host/home/HostBenefits"
import HostFAQ from "../../components/host/home/HostFAQ"
import HostHero from "../../components/host/home/HostHero"
import HowHostingWorks from "../../components/host/home/HowHostingWorks"


const HostHome: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HostHero />
      <HowHostingWorks />
      <HostBenefits />
      <HostFAQ />
    </div>
  )
}

export default HostHome
