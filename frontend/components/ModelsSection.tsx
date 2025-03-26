const ModelsSection = ({
  setSelectedModel,
}: {
  setSelectedModel: (model: OpenSourceModel) => void
}) => {
  return (
    <div
      id="models"
      className="pt-12 pb-24 bg-gradient-to-b from-gray-900 to-gray-800 scroll-mt-8"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Available Models</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Choose from our selection of open source models to power your Voice
            Vault assistant. All models can be run locally on your own
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
  )
}

export default ModelsSection

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

export interface OpenSourceModel {
  name: string
  description: string
  requirements: string
  setupInstructions: string[]
}
