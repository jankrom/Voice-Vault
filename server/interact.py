import requests
import json
from flask import Flask, request, jsonify
from serve import start_ollama_server


#EXAMPLE REQUEST: curl -X POST http://localhost:6000/interact -H "Content-Type: application/json" -d "{\"message\": \"What is the origin of the name Kemdi?\"}"


app = Flask(__name__)

# Endpoint to receive requests, format them, and send them to the server
@app.route('/interact', methods=['POST'])
def interact():
    # Extract the incoming request data
    incoming_data = request.get_json()
    
    message = incoming_data.get('message', '')
    response = interact_with_ollama(message)
    print(response)
    return jsonify(response)



    '''
    # Send the formatted request to the server (e.g., localhost:5000)
    try:
        response = requests.post('http://localhost:5000/process', json=formatted_data)
        
        # Check if the server responded successfully
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Server processing failed'}), 500
    
    except requests.exceptions.RequestException as e:
        # Handle any error when trying to connect to the server
        return jsonify({'error': f'Error connecting to server: {str(e)}'}), 500
    '''

def interact_with_ollama(message):
    url = "http://localhost:11434/api/chat"  # Make sure this matches your Ollama API endpoint
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3",
        "messages": [{"role": "user", "content": message}],
        "stream": False
    }

    # Send the POST request
    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        #print("Response:", response.json())
        return response.json()
    else:
        print("Error:", response.status_code, response.text)

if __name__ == "__main__":
    app.run(port=6000)
