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
    name: "Qwen 2.5 7B",
    description:
      "Qwen's latest 7B parameter model optimized for chat and reasoning",
    setupInstructions: [
      "1. Pull Docker image: docker pull jankrom1/voice-vault-flask:qwen2.5-7b",
      "2. Pull Docker image: docker pull jankrom1/voice-vault-ollama:qwen2.5-7b",
      "3. Download docker-compose.yml and upload it to VM",
      "4. Run: MODEL_TAG_DOCKER=qwen2.5-7b MODEL=qwen2.5:7b PASSWORD=default-password docker compose up",
    ],
  },
  {
    name: "LLaMA 3",
    description: "Meta's latest generation of open foundation language models",
    setupInstructions: [
      "1. Pull Docker image: docker pull jankrom1/voice-vault-flask:llama3",
      "2. Pull Docker image: docker pull jankrom1/voice-vault-ollama:llama3",
      "3. Download docker-compose.yml and upload it to VM",
      "4. Run: MODEL_TAG_DOCKER=llama3 MODEL=llama3 PASSWORD=default-password docker compose up",
    ],
  },
  {
    name: "Vicuna 7B",
    description:
      "Fine-tuned LLaMA model optimized for chat and instruction following",
    setupInstructions: [
      "1. Pull Docker image: docker pull jankrom1/voice-vault-flask:vicuna-7b",
      "2. Pull Docker image: docker pull jankrom1/voice-vault-ollama:vicuna-7b",
      "3. Download docker-compose.yml and upload it to VM",
      "4. Run: MODEL_TAG_DOCKER=vicuna-7b MODEL=vicuna:7b PASSWORD=default-password docker compose up",
    ],
  },
]

export interface OpenSourceModel {
  name: string
  description: string
  setupInstructions: string[]
}
