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
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              1. Prepare Environment
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Minimum 4 CPU cores</li>
              <li>• 16GB RAM recommended</li>
              <li>• 100GB storage space</li>
              <li>• Ubuntu 22.04 LTS</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              2. Install Dependencies
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>Run the following commands:</p>
              <code className="block bg-gray-900/50 p-2 rounded text-sm font-mono">
                curl -fsSL setup.voicevault.ai | sh
              </code>
              <p>This will install all required packages and dependencies.</p>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">
              3. Configure & Launch
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Configure your VM settings below</li>
              <li>• Select your preferred model</li>
              <li>• Start the Voice Vault service</li>
              <li>• Connect your devices</li>
            </ul>
          </div>
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
