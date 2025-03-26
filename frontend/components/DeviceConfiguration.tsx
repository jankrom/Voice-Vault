import React from "react"

const DeviceConfiguration = () => {
  return (
    <div
      id="device-setup"
      className="py-24 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Configure Your Device</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Follow these steps to connect your Voice Vault device to your
            network and configure your preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
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
                      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    1. Connect to Device
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Look for the IP address displayed at the bottom of your
                    Voice Vault device screen.
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm text-gray-300">
                    Example: http://192.168.1.100:8080
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
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
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    2. Set Up WiFi
                  </h3>
                  <p className="text-gray-300">
                    Visit the IP address in your browser and follow the prompts
                    to connect your device to your WiFi network.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
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
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    3. Configure Wake Word
                  </h3>
                  <p className="text-gray-300">
                    Choose and set up your preferred wake word to activate your
                    Voice Vault assistant.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
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
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    4. Connect VM
                  </h3>
                  <p className="text-gray-300">
                    Enter your VM's URL to connect it with your Voice Vault
                    device. This enables the AI conversation features.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 text-white">
              Important Notes
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-400 shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-300">
                  Make sure your computer and Voice Vault device are on the same
                  network during initial setup.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-400 shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-300">
                  Your VM should be accessible from your device's network for
                  the AI features to work properly.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-400 shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-300">
                  The wake word can be changed at any time through the device's
                  web interface.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-blue-400 shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-300">
                  For optimal performance, ensure your VM meets the minimum
                  requirements for your chosen language model.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceConfiguration
