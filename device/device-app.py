import os
import pyaudio
import wave
from TTS.api import TTS
import requests
from dotenv import load_dotenv
import json
import queue
import sounddevice as sd
from vosk import Model, KaldiRecognizer
import time
import random

#Loading env file
load_dotenv()

#Getting envs
KEYWORD = os.getenv("ACTIVATION_KEYWORD").lower()
MODEL_ADDR = os.getenv("MODEL_ADDR")
API_KEY = os.getenv("API_KEY")

#Str constants
FOUND_KEYWORD_STR_ARRAY = ["Hi what can I help you with?", "Hey, whats up?", "What can I help you with?"]
MISSED_QUERY_STR = "I didn't quite get that. Can you repeat that?"

#Variable for controlling mic capture
listen_enabled = True

#TTS model intialization - Coqui TTS
model_name = "tts_models/en/ljspeech/tacotron2-DDC"
tts = TTS(model_name=model_name)

#STT model intialization - Vosk
model = Model("vosk-model")  
recognizer = KaldiRecognizer(model, 16000)
q = queue.Queue()

#Audio Output
p = pyaudio.PyAudio()

#Call back function for mic capture
def audio_callback(indata, frames, time, status):
    if status:
        print(status)
    if listen_enabled:
        q.put(bytes(indata)) 

#Querying model
#TODO: Change this from dummy data to actually query the model    
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
        
#This function outputs audio using the speaker      
def speak(query_response):
    global listen_enabled
    
    #Write speech to wav file
    tts.tts_to_file(text=query_response, file_path="output.wav") 
    wf = wave.open("output.wav", 'rb')
    
    #open stream
    stream = p.open(
        format=p.get_format_from_width(wf.getsampwidth()),
        channels=wf.getnchannels(),
        rate=wf.getframerate(),
        output=True
    )
    
    chunk_size = 1024
    audio_data = wf.readframes(chunk_size)

    #Turning off mic during audio output
    listen_enabled = False
    
    #Outputting audio
    while audio_data:
        stream.write(audio_data)
        audio_data = wf.readframes(chunk_size)
    
    #Short sleep so mic/speaker don't overlap
    time.sleep(0.2)
    
    #Turning mic back on
    listen_enabled = True
    
    stream.stop_stream()
    stream.close()
    
    wf.close()

def main():
    # Open audio input stream
    with sd.RawInputStream(samplerate=16000, blocksize=8000, dtype="int16",
                        channels=1, callback=audio_callback):
        print("Listening for keyword...")

        keyword_detected = False
        while True:
            data = q.get()

            if recognizer.AcceptWaveform(data):
                result = json.loads(recognizer.Result())
                text = result.get("text", "")

                if not keyword_detected:
                    
                    if KEYWORD in text.lower():
                        print("Keyword detected! Speak your query:")
                        speak(random.choice(FOUND_KEYWORD_STR_ARRAY))
                        
                        keyword_detected = True
                else:
                    if text:
                        text = text.replace("hey what can i help you with", "")
                        print(f"Heard query: {text}")
                        query_response = query_model(text)
                        speak(query_response)
                        keyword_detected = False
                        print("Listening for keyword...")
    

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    

