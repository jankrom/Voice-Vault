import wave
import pyaudio
import threading
import time
import os

class AudioPlayer:
    def __init__(self, audio_file, p):
        self.chunk = 1024
        self.audio_file = audio_file
        self.wf = wave.open(self.audio_file, 'rb')
        self.p = p
        self.stream = self.p.open(
            format=self.p.get_format_from_width(self.wf.getsampwidth()),
            channels=self.wf.getnchannels(),
            rate=self.wf.getframerate(),
            output=True
        )
        self.playing = threading.Event()
        self.stopped = threading.Event()
        self.play_thread = threading.Thread(target=self._play_audio)

    def _play_audio(self):
        data = self.wf.readframes(self.chunk)
        while data and not self.stopped.is_set():
            if self.playing.is_set():
                self.stream.write(data)
                data = self.wf.readframes(self.chunk)
            else:
                time.sleep(0.1)

        self.stream.stop_stream()
        self.stream.close()
        self.wf.close()
        self.p.terminate()

    def play(self):
        if not self.play_thread.is_alive():
            self.playing.set()
            self.play_thread.start()

    def pause(self):
        self.playing.clear()

    def unpause(self):
        self.playing.set()

    def stop(self):
        self.stopped.set()
        self.playing.set()  # Ensure thread can finish if paused
        self.play_thread.join()

