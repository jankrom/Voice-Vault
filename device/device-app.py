import speech_recognition as sr
import os

KEYWORD = os.getenv("ACTIVATION_WORD")
MODEL_ADDR = os.getenv("MODEL_ADDR")
API_KEY = os.getenv("API_KEY")

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

def save_query(query, filename):
    """
    Appends the query to a file.
    """
    try:
        with open(filename, "a") as f:
            f.write(query + "\n")
        print("Query saved to", filename)
    except Exception as e:
        print("Error saving query:", e)

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
                save_query(query, TEST_OUTPUT_FILE)
            print("Waiting for the next keyword...\n")

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\nProgram terminated by user.")
    

