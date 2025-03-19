import requests
import json

from serve import start_ollama_server

def interact_with_ollama():
    url = "http://localhost:11434/api/chat"  # Make sure this matches your Ollama API endpoint
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3",
        "messages": [{"role": "user", "content": "What are God Particles?"}],
        "stream": False
    }

    # Send the POST request
    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code, response.text)

if __name__ == "__main__":
    #start_ollama_server()  # Start the server
    interact_with_ollama()  # Send a request to the server
