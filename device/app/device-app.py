import json
import os
import queue
import random
import threading
import time
import wave
from datetime import datetime, timedelta

import lmdb
import music_play
import pyaudio
import requests
import sounddevice as sd
from dotenv import load_dotenv
from TTS.api import TTS
from vosk import KaldiRecognizer, Model

#Loading env file
load_dotenv()

#Opening song db in readonly mode
env = lmdb.open('../website/song_db', readonly=True, lock=False)

#Path to directory holding songs
SONG_PATH = "../website/song_db/"

#Getting envs
KEYWORD = os.getenv("ACTIVATION_KEYWORD").lower()
MODEL_ADDR = os.getenv("MODEL_ADDR")
API_KEY = os.getenv("API_KEY")

#Str constants
FOUND_KEYWORD_STR_ARRAY = ["Hi what can I help you with?", "Hey, whats up?", "What can I help you with?"]
MISSED_QUERY_STR = "I didn't quite get that. Can you repeat that?"
with open("system-prompt.txt", 'r') as file:
    SYSTEM_PROMPT = file.read()

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

#music player
music_player = None

alarm_event = threading.Event()

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
        return "{'type': 'Error', 'data': 'Error connecting to server'}"

#formatting query + adding system prompt
def format_query(raw_query):
    query = SYSTEM_PROMPT + f"The approximate datetime is {datetime.now()} use this approximation if the user asks for the time \n ----End System Prompt---- \n ['{raw_query}', []]"
    
    return query
       
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

def create_alarm(alarm_time):
    # Convert alarm_time string to hours and minutes
    hours = alarm_time // 100
    minutes = alarm_time % 100
    
    # Get current time
    now = datetime.now()
    
    # Create alarm time for today
    alarm_datetime = now.replace(hour=hours, minute=minutes, second=0, microsecond=0)
    
    # If alarm time is in the past, set it for tomorrow
    if alarm_datetime < now:
        alarm_datetime += timedelta(days=1)
    
    # Calculate seconds until alarm
    delay = (alarm_datetime - now).total_seconds()
    
    # Start alarm thread
    def alarm_thread():
        # Wait for either the delay time to pass or the event to be set
        if not alarm_event.wait(
            delay
        ):
            # Play alarm sound
            wf = wave.open("alarm.wav", "rb")
            stream = p.open(
                format=p.get_format_from_width(wf.getsampwidth()),
                channels=wf.getnchannels(),
                rate=wf.getframerate(),
                output=True
            )
            
            chunk_size = 1024
            audio_data = wf.readframes(chunk_size)
            
            # Output alarm audio
            while audio_data:
                stream.write(audio_data)
                audio_data = wf.readframes(chunk_size)
                
            stream.stop_stream()
            stream.close()
            wf.close()

    # Clear any previous event signal
    alarm_event.clear()
    # Start thread for alarm
    threading.Thread(target=alarm_thread, name="alarm_thread").start()

    speak(f"Alarm set for {hours:02d}:{minutes:02d}")

def cancel_alarm():
    alarm_event.set()
    speak("Alarm cancelled")

def handle_alarm(alarm_metadata):
    if alarm_metadata.type == "Create":
        create_alarm(int(alarm_metadata.time))
    elif alarm_metadata.type == "Cancel":
        cancel_alarm()
    else:
        speak("An error occured trying to handle your timer")

def play_song(song_name, song_file):
    global music_player
    
    music_player = music_play.AudioPlayer(song_file, p)
    
    speak(f"Playing {song_name}")
    
    time.sleep(1)
    
    music_player.play()

def stop_song():
    global music_player
    
    if music_player:
        music_player.stop()
        music_player = None
    else:
        speak("No music currently playing")

def song_file_exists(song_file):
    file_path = os.path.join(SONG_PATH, song_file)
    return os.path.isfile(file_path)
        

def handle_music(music_metadata):
    global music_player
    
    if music_metadata == "STOP":
        stop_song()
    elif music_metadata == "PAUSE":
        if music_player:
            music_player.pause()
    elif music_metadata == "UNPAUSE":
        if music_player:
            music_player.unpause()
    else:
        with env.begin() as txn:
            song_file = txn.get(music_metadata.encode('utf-8')).decode('utf-8')
            if song_file and song_file_exists(song_file):
                play_song(music_metadata, song_file)
            else:
                speak("An error was encountered playing that song. Please check \
                    that it was properly uploaded.")
                
def extract_answer(query_response):
    try:
        response = json.loads(query_response)
        
        try:
            if response["type"] == "LLM":
                speak(response["data"])
            elif response["type"] == "Alarm":
                handle_alarm(response["data"])
            elif response["type"] == "Music":
                handle_music(response["data"])
                
        except KeyError as e:
            speak("An error occured processing your request.")
        
    except json.JSONDecodeError as e:
        speak("An error occured decoding your request.")

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
                        query_response = query_model(format_query(text))
                        speak(query_response)
                        keyword_detected = False
                        print("Listening for keyword...")
    

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    

