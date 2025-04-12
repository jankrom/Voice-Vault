import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { OpenSourceModel } from "./ModelsSection"

const ModelSetupDialog = ({
  selectedModel,
  setSelectedModel,
}: {
  selectedModel: OpenSourceModel | null
  setSelectedModel: (model: OpenSourceModel | null) => void
}) => {
  const handleDownloadCompose = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = "/docker-compose.yml"
  }

  return (
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
              Setup Instructions:
            </h3>
            <ol className="space-y-2">
              {selectedModel?.setupInstructions.map((instruction, index) => (
                <li key={index} className="text-sm text-gray-400">
                  {instruction.startsWith("3.") ? (
                    <a
                      href="/docker-compose.yml"
                      className="text-blue-400 hover:text-blue-300 underline"
                      download
                    >
                      {instruction}
                    </a>
                  ) : (
                    instruction
                  )}
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
  )
}

export default ModelSetupDialog
