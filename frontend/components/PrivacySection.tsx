const PrivacySection = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Privacy & Data Security</h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Your conversations and data are always under your control. No one but
          you ever has access to any of your data.
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
                conversations and data never leave your infrastructure, ensuring
                complete privacy and control.
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
  )
}

export default PrivacySection
