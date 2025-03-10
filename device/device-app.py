import speech_recognition as sr
import os
import pyaudio
import wave
from TTS.api import TTS
import requests
from dotenv import load_dotenv

load_dotenv()

KEYWORD = os.getenv("ACTIVATION_KEYWORD")
MODEL_ADDR = os.getenv("MODEL_ADDR")
API_KEY = os.getenv("API_KEY")
FOUND_KEYWORD_STR = "Hi what can I help you with?"


MISSED_QUERY_STR = "I didn't quite get that. Can you repeat that?"


model_name = "tts_models/en/ljspeech/tacotron2-DDC"
tts = TTS(model_name=model_name)


p = pyaudio.PyAudio()


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
        return ""
    except sr.RequestError as e:
        # Error with the recognition engine
        print("Sphinx error: {0}".format(e))
        return ""
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
        
        
def speak(query_response):
    tts.tts_to_file(text=query_response, file_path="output.wav") 
    wf = wave.open("output.wav", 'rb')
    
    stream = p.open(
        format=p.get_format_from_width(wf.getsampwidth()),
        channels=wf.getnchannels(),
        rate=wf.getframerate(),
        output=True
    )
    
    chunk_size = 1024
    audio_data = wf.readframes(chunk_size)

    while audio_data:
        stream.write(audio_data)
        audio_data = wf.readframes(chunk_size)
    
    stream.stop_stream()
    stream.close()
    
    wf.close()
    

def main():
    print("starting")
    recognizer = sr.Recognizer()
    # Use the default microphone (the built-in mic on your Mac)
    microphone = sr.Microphone()

    print("Starting speech recognition program. Say the keyword to trigger query recording.")
    while True:
        # Continuously listen for the keyword
        detected_text = listen(recognizer, microphone)
        if detected_text and KEYWORD in detected_text:
            # When the keyword is detected, record the following query
            speak(FOUND_KEYWORD_STR)
            query = record_query(recognizer, microphone)
            if query:
                # query_response = query_third_party(query)
                query_response = query_model(query)
            else:
                query_response = MISSED_QUERY_STR
            speak(query_response)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    

