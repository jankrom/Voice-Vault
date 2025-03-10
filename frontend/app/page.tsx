"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface OpenSourceModel {
  name: string
  description: string
  requirements: string
  setupInstructions: string[]
}

const openSourceModels: OpenSourceModel[] = [
  {
    name: "LocalLLaMA-7B",
    description: "Efficient local language model optimized for CPU inference",
    requirements: "Minimum 16GB RAM, 4 CPU cores",
    setupInstructions: [
      "1. Clone the LocalLLaMA repository",
      "2. Install dependencies: pip install -r requirements.txt",
      "3. Download model weights using: python download_weights.py",
      "4. Run setup script: ./setup.sh",
      "5. Start the model server: python serve.py",
    ],
  },
  {
    name: "OpenChat-3B",
    description: "Lightweight conversational AI for real-time responses",
    requirements: "Minimum 8GB RAM, 2 CPU cores",
    setupInstructions: [
      "1. Download OpenChat package",
      "2. Run: pip install openchat-3b",
      "3. Initialize model: openchat init",
      "4. Configure environment variables",
      "5. Launch server: openchat serve",
    ],
  },
  {
    name: "FastGPT-Local",
    description: "High-performance local GPT model with minimal latency",
    requirements: "Minimum 32GB RAM, 8 CPU cores, NVIDIA GPU recommended",
    setupInstructions: [
      "1. Install CUDA dependencies",
      "2. Clone FastGPT repository",
      "3. Run installation script: ./install.sh",
      "4. Download model: fastgpt download",
      "5. Start inference server: fastgpt start",
    ],
  },
  {
    name: "MiniLM-Edge",
    description:
      "Edge-optimized language model for resource-constrained environments",
    requirements: "Minimum 4GB RAM, 2 CPU cores",
    setupInstructions: [
      "1. Get MiniLM package",
      "2. Install using: pip install minilm-edge",
      "3. Download compact model weights",
      "4. Set up configuration file",
      "5. Run: minilm serve --config config.yml",
    ],
  },
  {
    name: "NeoX-Local",
    description:
      "Full-featured local language model with extensive customization",
    requirements: "Minimum 64GB RAM, 12 CPU cores, NVIDIA GPU required",
    setupInstructions: [
      "1. Set up CUDA environment",
      "2. Install NeoX dependencies",
      "3. Clone and build from source",
      "4. Download model weights (120GB)",
      "5. Launch using: neox-serve --model large",
    ],
  },
]

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<OpenSourceModel | null>(
    null
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
          <div className="absolute inset-0"></div>
          {/* Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246 / 0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
          {/* Animated Lines */}
          <div className="absolute inset-0">
            <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-[slide-in-up_5s_ease-in-out_infinite]"></div>
            <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-[slide-in-up_7s_ease-in-out_infinite]"></div>
            <div className="absolute left-2/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-[slide-in-up_6s_ease-in-out_infinite]"></div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative w-full px-4">
          <div className="text-center">
            <h1 className="text-6xl sm:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 tracking-tight">
              Voice Vault
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Your private AI home assistant that keeps all your conversations
              secure and your data under your control.
            </p>
            <a
              href="#setup"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors group"
            >
              Get Started
              <svg
                className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* VM Setup Section */}
      <div
        id="setup"
        className="bg-gradient-to-b from-gray-800 to-gray-900 scroll-mt-8"
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

      {/* Models Section */}
      <div
        id="models"
        className="pt-12 pb-24 bg-gradient-to-b from-gray-900 to-gray-800 scroll-mt-8"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Available Models</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Choose from our selection of open source models to power your
              Voice Vault assistant. All models can be run locally on your own
              infrastructure.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {openSourceModels.map((model) => (
              <div
                key={model.name}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors cursor-pointer border border-gray-700"
                onClick={() => setSelectedModel(model)}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-300">{model.description}</p>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400">{model.requirements}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="py-12 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Privacy & Data Security</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Your conversations and data are always under your control. No one
            but you ever has access to any of your data.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Privacy & Data Security
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Local Processing
                </h3>
                <p className="text-gray-400 text-sm">
                  All data processing happens locally on your VM. Your
                  conversations and data never leave your infrastructure,
                  ensuring complete privacy and control.
                </p>
              </div>
              <div className="space-y-3">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Data Ownership
                </h3>
                <p className="text-gray-400 text-sm">
                  You maintain 100% ownership of your data. Voice Vault never
                  stores, accesses, or transmits your conversations or personal
                  information to external servers.
                </p>
              </div>
              <div className="space-y-3">
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
                <h3 className="text-lg font-semibold text-white">
                  Configuration Control
                </h3>
                <p className="text-gray-400 text-sm">
                  Customize and control your deployment settings. API keys and
                  configuration data are stored securely on your VM and can be
                  modified or deleted at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Setup Instructions Dialog */}
      <Dialog
        open={selectedModel !== null}
        onOpenChange={(open) => !open && setSelectedModel(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">
              {selectedModel?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedModel?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white mb-2">
                Requirements:
              </h3>
              <p className="text-sm text-gray-400">
                {selectedModel?.requirements}
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white mb-2">
                Setup Instructions:
              </h3>
              <ol className="space-y-2">
                {selectedModel?.setupInstructions.map((instruction, index) => (
                  <li key={index} className="text-sm text-gray-400">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <button
              onClick={() => setSelectedModel(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
