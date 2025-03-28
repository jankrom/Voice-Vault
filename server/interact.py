from ollama import chat, ChatResponse
from flask import Flask, request, jsonify
import os


# EXAMPLE REQUEST: curl -X POST http://localhost:6000/interact -H "Content-Type: application/json" -d "{\"message\": \"What is the origin of the name Kemdi?\"}"


app = Flask(__name__)

# Get Ollama host from environment variable
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
os.environ["OLLAMA_HOST"] = OLLAMA_HOST

# Get model tag from environment variable
MODEL_TAG = os.getenv("MODEL")


# Endpoint to receive requests, format them, and send them to the server
@app.route("/interact", methods=["POST"])
def interact():
    # Extract the incoming request data
    incoming_data = request.get_json()

    message = incoming_data.get("message", "")
    response = predict(message)
    print(response)
    return jsonify(response)


def predict(query):
    response: ChatResponse = chat(
        model=MODEL_TAG,
        messages=[
            {
                "role": "user",
                "content": query,
            },
        ],
    )
    return response.message.content


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)
