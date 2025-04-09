from ollama import chat, ChatResponse
from flask import Flask, request, jsonify, stream_with_context, Response
import os


# EXAMPLE REQUEST: curl -X POST http://localhost:6000/interact -H "Content-Type: application/json" -d "{\"message\": \"What is the origin of the name Kemdi?\"}"


app = Flask(__name__)

# Get Ollama host from environment variable
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
os.environ["OLLAMA_HOST"] = OLLAMA_HOST

# Get model tag from environment variable
MODEL_TAG = os.getenv("MODEL")
PASSWORD = os.getenv("PASSWORD")
# Open a file in read mode
with open('server/system-prompt.txt', 'r') as file:
    SYSTEM_PROMPT = file.read()

# Endpoint to receive requests, format them, and send them to the server
@app.route("/interact", methods=["POST"])
def interact():
    incoming_data = request.get_json()

    password = incoming_data.get("password")
    if password != PASSWORD:
        return jsonify({"error": "Invalid password"}), 401

    message = incoming_data.get("message", "")
    return Response(stream_with_context(predict(message)), mimetype='text/plain')


def predict(query):
    streamm = chat(
        model=MODEL_TAG,
        messages=[
            {"role": "assistant", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query},
        ],
        stream=True
    )
    for chunk in streamm:
        yield chunk["message"]["content"]


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)
