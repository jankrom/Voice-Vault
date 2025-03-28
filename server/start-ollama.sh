#!/bin/bash

echo "Starting Ollama server..."
ollama serve &
SERVER_PID=$!

echo "Waiting for server to start..."
while ! ollama list | grep -q 'NAME'; do
    sleep 1
done


# Extract model name from MODEL variable (removing quotes if present)
MODEL_NAME=$(echo $MODEL | tr -d '"')
echo "Pulling model: $MODEL_NAME..."

# Check if MODEL_NAME has a value
if [ -z "$MODEL_NAME" ]; then
    echo "❌ No model specified in MODEL environment variable"
else
    # Check if model exists
    if ollama list | grep -q "$MODEL_NAME"; then
        echo "🟢 Model ($MODEL_NAME) already installed"
        touch /tmp/ollama_ready  # Creates a temporary file to signal readiness
    else
        echo "🔴 Retrieving model ($MODEL_NAME)..."
        # Attempt to pull model and verify before creating the ready flag
        if ollama pull "$MODEL_NAME" 2>/dev/null && ollama list | grep -q "$MODEL_NAME"; then
            echo "🟢 Model download complete!"
            touch /tmp/ollama_ready  # Mark readiness after successful download
        else
            echo "❌ Error downloading model ($MODEL_NAME)"
        fi
    fi
fi
# ollama pull $MODEL_VERSION

wait $SERVER_PID