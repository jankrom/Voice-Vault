import React from "react"

const VMSection = () => {
  return (
    <div
      id="setup"
      className="py-24 bg-gradient-to-b from-gray-800 to-gray-900 scroll-mt-8"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Set Up Your Virtual Machine
        </h2>
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Virtual Machine Setup Guide
          </h3>
          <p className="text-gray-300 mb-6">
            Follow our step-by-step guide to set up your virtual machine environment. Once complete, you can choose and configure your preferred AI model.
          </p>
          <a
            href="/vm-setup.pdf"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors"
            download
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Setup Guide
          </a>
        </div>
        <div className="text-center mt-12">
          <a
            href="#models"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Choose Your Model
          </a>
        </div>
      </div>
    </div>
  )
}

export default VMSection
