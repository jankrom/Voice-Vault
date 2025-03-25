#!/bin/bash

echo "Activating Captive Portal..."

# Stop Wi-Fi client (if running)
sudo systemctl stop wpa_supplicant || true
sudo nmcli radio wifi off || true

# Assign static IP
sudo ip addr flush dev wlan0
sudo ip addr add 192.168.4.1/24 dev wlan0
sudo ip link set wlan0 up

# Start required services
sudo systemctl start dnsmasq
sudo systemctl start hostapd
sudo systemctl start nodogsplash

echo "Captive Portal Activated."
