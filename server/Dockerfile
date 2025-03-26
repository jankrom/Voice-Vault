# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Copy the Llama model into the container
#COPY Ollama /app/ollama


# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that Flask will run on
EXPOSE 6000

ENV FLASK_APP=interact.py

# Define the command to run your Flask app
CMD ["python", "interact.py", "--host=0.0.0.0", "--port=6000"]


