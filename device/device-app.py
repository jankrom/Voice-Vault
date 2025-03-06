import speech_recognition as sr
import os
import pyttsx3
import requests



KEYWORD = os.getenv("ACTIVATION_KEYWORD")
MODEL_ADDR = os.getenv("MODEL_ADDR")
API_KEY = os.getenv("API_KEY")

MISSED_QUERY_STR = "I didn't quite get that. Can you repeat that?"
engine = pyttsx3.init()


TEST_OUTPUT_FILE = "output.txt"

def listen(recognizer, microphone):
    """
    Listen for the keyword using the microphone and offline recognition.
    Returns the recognized text (or an empty string if nothing is recognized).
    """
    print("Listening for the keyword...")
    with microphone as source:
        # Calibrate for ambient noise (optional but recommended)
        recognizer.adjust_for_ambient_noise(source, duration=1)
        audio = recognizer.listen(source)

    try:
        # Using pocketsphinx for offline recognition.
        recognized_text = recognizer.recognize_sphinx(audio)
        print("Heard (for keyword):", recognized_text)
        return recognized_text.lower()  # convert to lowercase for comparison
    except sr.UnknownValueError:
        # Speech was unintelligible
        print("Could not understand audio for keyword.")
    except sr.RequestError as e:
        # Error with the recognition engine
        print("Sphinx error: {0}".format(e))
    return ""

def record_query(recognizer, microphone):
    """
    Records the spoken query after the keyword has been detected.
    Returns the recognized query text.
    """
    print("Keyword detected. Please speak your query...")
    with microphone as source:
        # Re-calibrate for ambient noise before recording query
        recognizer.adjust_for_ambient_noise(source, duration=1)
        audio = recognizer.listen(source)

    try:
        # Recognize the query using pocketsphinx
        query_text = recognizer.recognize_sphinx(audio)
        print("Recognized query:", query_text)
        return query_text
    except sr.UnknownValueError:
        print("Could not understand the query.")
    except sr.RequestError as e:
        print("Sphinx error: {0}".format(e))
    return ""

# def query_third_party(query):
#     client = openai(
#         api_key=API_KEY,
#         base_url=MODEL_ADDR
#     )
    
#     try:
#         response = client.chat.completions.create(
#             model="gemini-1.5-flash",
#             messages=[
#                 {"role": "system", "content": "You are a helpful conversational assistant.\
#                     Please answer the following query politely and concisely; however, \
#                     elaborate when necessary."},
#                 {"role": "user", "content": query}
#             ]
#         )
#         reply = response.choices[0].message['content']
#         return reply
    
#     except openai.error.AuthenticationError as e:
#         return "Authentication error: Please check your API key."
#     except openai.error.RateLimitError as e:
#         return "Rate limit exceeded. Please try again later."
#     except openai.error.APIConnectionError as e:
#         return f"Failed to connect to the OpenAI API: {e}"
#     except openai.error.Timeout as e:
#         return f"Request timed out: {e}"
#     except openai.error.APIError as e:
#         return "OpenAI API returned an API error: {e}"
#     except Exception as e:
#         return "An unexpected error occurred: {e}"

def query_model(query):
    params = {
        "userId": 1,
        "api_key": API_KEY
    
    }
    response = requests.get(MODEL_ADDR, params=params)
    if response.status_code == 200:
        # Convert response to JSON
        data = response.json()
        if data:
            return list(data.keys())[0]
    else:
        return "Error processing query"
        
        
def speak_response(query_response):
    engine.say(query_response)
    engine.runAndWait()  

def main():
    recognizer = sr.Recognizer()
    # Use the default microphone (the built-in mic on your Mac)
    microphone = sr.Microphone()

    print("Starting speech recognition program. Say the keyword to trigger query recording.")
    while True:
        # Continuously listen for the keyword
        detected_text = listen(recognizer, microphone)
        if KEYWORD in detected_text:
            # When the keyword is detected, record the following query
            query = record_query(recognizer, microphone)
            if query:
                # query_response = query_third_party(query)
                query_response = query_model(query)
            else:
                query_response = MISSED_QUERY_STR
            speak_response(query_response)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    

