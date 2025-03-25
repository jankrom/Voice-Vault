from ollama import chat
from ollama import ChatResponse
from flask import Flask, request, jsonify


#EXAMPLE REQUEST: curl -X POST http://localhost:6000/interact -H "Content-Type: application/json" -d "{\"message\": \"What is the origin of the name Kemdi?\"}"


app = Flask(__name__)

# Endpoint to receive requests, format them, and send them to the server
@app.route('/interact', methods=['POST'])
def interact():
    # Extract the incoming request data
    incoming_data = request.get_json()
    
    message = incoming_data.get('message', '')
    response = predict(message)
    print(response)
    return jsonify(response)
def predict(query):
    response: ChatResponse = chat(model='llama3', messages=[
       {
        'role': 'user',
        'content': query,
       },
    ])
    return response.message.content
if __name__ == "__main__":
    app.run(port=6000)
