import { useState } from "react"

export default function TermsOfService() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            {isOpen ? "Hide Terms of Service" : "View Terms of Service"}
            <svg
              className={`w-5 h-5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">
              Terms of Service
            </h2>

            <h3 className="text-xl font-semibold text-white mt-6">
              1. Data Privacy and Collection
            </h3>
            <p className="text-gray-400">
              Voice Vault is committed to absolute user privacy and data
              security. We do not collect, store, process, or have access to any
              user data whatsoever. Our business model is solely based on
              selling physical devices and providing open-source model
              implementations.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6">
              2. Our Role and Responsibilities
            </h3>
            <div className="text-gray-400">
              We provide only:
              <ul className="list-disc pl-6 text-gray-400">
                <li>Physical Voice Vault devices</li>
                <li>Implementation of open-source models</li>
                <li>Setup instructions and documentation</li>
                <li>Technical support for device setup</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6">
              3. Data Storage and Processing
            </h3>
            <p className="text-gray-400">
              All data processing occurs locally on your device or your
              configured VM. We maintain no servers that store, process, or
              transmit your data. The models provided are strictly local
              implementations that run on your infrastructure.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6">
              4. Security Responsibilities
            </h3>
            <div className="text-gray-400">
              While we provide secure default configurations and setup
              instructions, you are responsible for:
              <ul className="list-disc pl-6 text-gray-400">
                <li>Following our security setup instructions precisely</li>
                <li>Maintaining the security of your device and VM</li>
                <li>Managing access to your device and data</li>
                <li>Implementing additional security measures as needed</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6">
              5. Disclaimer of Data Security
            </h3>
            <div className="text-gray-400">
              While we provide secure default configurations, we cannot
              guarantee the privacy or security of your data if:
              <ul className="list-disc pl-6 text-gray-400">
                <li>Setup instructions are not followed correctly</li>
                <li>Device or VM security is compromised</li>
                <li>Unauthorized physical access to the device occurs</li>
                <li>Custom configurations are implemented incorrectly</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-6">
              6. Third-Party Access
            </h3>
            <p className="text-gray-400">
              We do not share, sell, or provide access to any user data with
              third parties, as we never have access to this data in the first
              place. Any data sharing or access would be solely the result of
              your own device configuration and usage.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6">
              7. Updates and Changes
            </h3>
            <p className="text-gray-400">
              We may update these terms of service to reflect changes in our
              business practices. Any changes will maintain our core commitment
              to zero data collection and complete user privacy.
            </p>

            <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
              <p className="text-blue-400 font-medium">
                By using Voice Vault, you acknowledge that you understand and
                agree to these terms, particularly that you are solely
                responsible for the security and privacy of your data through
                proper device configuration and maintenance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
