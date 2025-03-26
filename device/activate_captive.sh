#!/bin/bash

echo "Activating Captive Portal..."

# Unblock Wi-Fi interface
sudo rfkill unblock wifi
sudo rfkill unblock all

# Stop Wi-Fi client (if running)
sudo systemctl stop wpa_supplicant || true
sudo nmcli radio wifi off || true

# Assign static IP
sudo ip addr flush dev wlan0
sudo ip addr add 192.168.4.1/24 dev wlan0
sudo ip link set wlan0 up

# Start required services
# sudo systemctl start dnsmasq
# sudo systemctl start hostapd
# sudo systemctl start nodogsplash

sudo systemctl restart dhcpcd
sudo systemctl restart dnsmasq
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl restart hostapd

sudo systemctl enable nodogsplash
sudo systemctl restart nodogsplash

echo "Captive Portal Activated."
