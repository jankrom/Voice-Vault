const ProductDescription = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Your Private AI Assistant</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Voice Vault is a privacy-first AI home assistant that puts you in
            complete control of your data. All processing happens on your
            infrastructure, ensuring your conversations and data stay private.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              AI Conversations
            </h3>
            <p className="text-gray-300">
              Choose from multiple open-source language models to power your
              conversations. Host the model on your VM for complete privacy and
              control.
            </p>
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Smart Alarms
            </h3>
            <p className="text-gray-300">
              Set and manage alarms through voice commands. Your alarm data
              stays local and secure on your device. (Up to 1 alarm)
            </p>
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
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Music Player
            </h3>
            <p className="text-gray-300">
              Upload and play your MP3 collection through voice commands. Your
              music library remains private on your device.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-center text-white">
            Simple Setup Process
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold text-blue-400">1</span>
              </div>
              <p className="text-gray-300">Configure Voice Vault settings</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold text-blue-400">2</span>
              </div>
              <p className="text-gray-300">Set up your VM environment</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold text-blue-400">3</span>
              </div>
              <p className="text-gray-300">Select and configure your LLM</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-semibold text-blue-400">4</span>
              </div>
              <p className="text-gray-300">Start talking to your assistant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDescription
