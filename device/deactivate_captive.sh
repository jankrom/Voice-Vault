#!/bin/bash

echo "Deactivating Captive Portal..."

# Stop Captive Portal services
sudo systemctl stop nodogsplash
sudo systemctl stop hostapd
sudo systemctl stop dnsmasq

# Remove static IP assignment
sudo ip addr flush dev wlan0

# Restart Wi-Fi client services (if applicable)
sudo nmcli radio wifi on || true
sudo systemctl restart dhcpcd || true
sudo systemctl restart wpa_supplicant || true

echo "Captive Portal Deactivated. Wi-Fi client mode restored."
