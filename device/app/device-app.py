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
from vosk import KaldiRecognizer, Model

#Loading env file
load_dotenv()

#Opening song db in readonly mode
env = lmdb.open('../website/song_db', readonly=True, lock=False)

#Path to DB holding song names
SONG_PATH = "../website/song_db/"

#Path to directory holding song files
SONG_FILE_PATH = "../website/songs/"

#Getting envs
KEYWORD = os.getenv("ACTIVATION_KEYWORD").lower()
MODEL_ADDR = os.getenv("MODEL_ADDR")
API_KEY = os.getenv("API_KEY")

#Str constants
FOUND_KEYWORD_STR_ARRAY = ["Hi what can I help you with?", "Hey, whats up?", "What can I help you with?"]
MISSED_QUERY_STR = "I didn't quite get that. Can you repeat that?"


#Variable for controlling mic capture
listen_enabled = True

#TTS Model
tts_model = "lessac"

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

def format_query(text):
    with env.begin() as txn:
        with txn.cursor() as cursor:
            all_song_names = [key.decode("utf-8") for key in cursor.iternext(keys=True, values=False)]
            query = f"['{text}', {all_song_names}]"
            return query

#Querying model
#TODO: Change this from dummy data to actually query the model    
def query_model(query):
    data = {
        "message": format_query(query)
    
    }
    response = requests.get(MODEL_ADDR, json=data)
    if response.status_code == 200:
        # Convert response to JSON
        data = response.json()
        if data:
            # return list(data.keys())[0]
            # return {"type":"Music", "data": "mime"}
            return data
    else:
        return {"type":"Error", "data": "Network errort"}

def make_audio_file(query_response, output_filename="output.wav"):
    cmd = f"echo '{query_response}' | piper \
        --model ./tts-models/{tts_model}/{tts_model}.onnx\
        --output_file {output_filename}"
    os.system(cmd)
    
def speak(query_response):    
    cmd = f"espeak '{query_response}'"
    os.system(cmd)
    
#This function outputs audio using the speaker      
def speak_real(query_response):
    global listen_enabled
    
    #Write speech to wav file
    make_audio_file(query_response)
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
    if alarm_metadata == "Cancel":
        cancel_alarm()
    else:
        try:
            alarm_metadata = alarm_metadata.split(":")
            formatted_alarm_metadata = alarm_metadata[0] + alarm_metadata[1]
            create_alarm(int(formatted_alarm_metadata))
        except Exception as e:
            speak("Error creating your alarm")


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
            song_file = txn.get(music_metadata.encode('utf-8'))
            if song_file:
                song_file = song_file.decode('utf-8')
                song_file = os.path.join(SONG_FILE_PATH, song_file)
                if song_file and os.path.isfile(song_file):
                    play_song(music_metadata, song_file)
                else:
                    speak("An error was encountered playing that song. Please check \
                        that it was properly uploaded.")
            else:
                speak("Song not found")
                
def extract_answer(response):
        
    try:
        if response["type"] == "LLM":
            speak(response["data"])
        elif response["type"] == "Alarm":
            handle_alarm(response["data"])
        elif response["type"] == "Music":
            handle_music(response["data"])
            
    except KeyError as e:
        speak(f"An error occured processing your request. : {e}")
        

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
                        print(f"Heard query: {text}")
                        query_response = query_model(text)
                        print(query_response)
                        extract_answer(query_response)
                        keyword_detected = False
                        print("Listening for keyword...")
    

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    

