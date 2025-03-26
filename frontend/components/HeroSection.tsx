import React from "react"

const HeroSection = () => {
  return (
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
  )
}

export default HeroSection
