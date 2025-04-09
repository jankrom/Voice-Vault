#!/bin/bash

echo "Starting Voice Vault..."

cd VoiceVault/device
source .venv/bin/activate
cd app
python device-app.py &
cd ../website
flask run --host=0.0.0.0 --port=5001 &
espeak "Voice Vault started"