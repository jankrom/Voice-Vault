import subprocess

def start_ollama_server():
    try:
        # Start the Ollama server
        print("Starting Ollama server...")
        subprocess.run(["ollama", "serve"], check=True)
        print("Ollama server started successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error starting Ollama server: {e}")

if __name__ == "__main__":
    start_ollama_server()
