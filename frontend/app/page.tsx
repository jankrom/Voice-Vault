"use client"

import { useState } from "react"
import TermsOfService from "@/components/TermsOfService"
import VMSection from "@/components/VMSection"
import HeroSection from "@/components/HeroSection"
import ProductDescription from "@/components/ProductDescription"
import DeviceConfiguration from "@/components/DeviceConfiguration"
import ModelsSection, { OpenSourceModel } from "@/components/ModelsSection"
import PrivacySection from "@/components/PrivacySection"
import ModelSetupDialog from "@/components/ModelSetupDialog"
import Navigation from "@/components/Navigation"

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<OpenSourceModel | null>(
    null
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navigation />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <ProductDescription />
      </div>
      <div id="setup">
        <DeviceConfiguration />
        <VMSection />
      </div>
      <div id="models">
        <ModelsSection setSelectedModel={setSelectedModel} />
      </div>
      <div id="privacy">
        <PrivacySection />
      </div>
      <TermsOfService />
      <ModelSetupDialog
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  )
}
