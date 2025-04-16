document.addEventListener("DOMContentLoaded", function () {
  // Load configurations on page load if the elements exist
  if (document.getElementById("vmForm")) {
    fetchCurrentVM()
  }
  if (document.getElementById("wifiForm")) {
    fetchCurrentWiFi()
  }
  if (document.getElementById("wakeWordForm")) {
    fetchCurrentWakeWord()
  }
  if (document.getElementById("fileList")) {
    loadFileList()
  }
  if (document.getElementById("speechStyleForm")) {
    fetchCurrentSpeechStyle()
  }

  // Handle VM form submission
  const vmForm = document.getElementById("vmForm")
  if (vmForm) {
    vmForm.addEventListener("submit", async function (e) {
      e.preventDefault()
      const vmUrl = document.getElementById("vmUrl").value
      try {
        const response = await fetch("/save_vm_config", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vm_url: vmUrl }),
        })
        if (response.ok) {
          fetchCurrentVM()
          document.getElementById("vmUrl").value = ""
          showStatus(
            "VM configuration saved successfully!",
            "success",
            "vmStatus"
          )
        } else {
          showStatus("Failed to save VM configuration", "error", "vmStatus")
        }
      } catch (error) {
        console.error("Error:", error)
        showStatus("Error saving VM configuration", "error", "vmStatus")
      }
    })
  }

  // Handle WiFi form submission
  const wifiForm = document.getElementById("wifiForm")
  if (wifiForm) {
    wifiForm.addEventListener("submit", async function (e) {
      e.preventDefault()
      const ssid = document.getElementById("ssid").value
      const password = document.getElementById("password").value
      try {
        const response = await fetch("/save_wifi_config", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ssid, password }),
        })
        if (response.ok) {
          fetchCurrentWiFi()
          document.getElementById("password").value = ""
          showStatus(
            "WiFi configuration saved successfully!",
            "success",
            "wifiStatus"
          )
        } else {
          showStatus("Failed to save WiFi configuration", "error", "wifiStatus")
        }
      } catch (error) {
        console.error("Error:", error)
        showStatus("Error saving WiFi configuration", "error", "wifiStatus")
      }
    })
  }

  // Handle Wake Word form submission
  const wakeWordForm = document.getElementById("wakeWordForm")
  if (wakeWordForm) {
    wakeWordForm.addEventListener("submit", async function (e) {
      e.preventDefault()
      const wakeWord = document.getElementById("wakeWord").value.trim()

      if (!wakeWord) {
        showStatus("Please enter a wake word", "error", "wakeWordStatus")
        return
      }

      try {
        const response = await fetch("/save_wake_word", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wake_word: wakeWord,
          }),
        })
        if (response.ok) {
          fetchCurrentWakeWord()
          document.getElementById("wakeWord").value = ""
          showStatus(
            "Wake word saved successfully!",
            "success",
            "wakeWordStatus"
          )
        } else {
          showStatus("Failed to save wake word", "error", "wakeWordStatus")
        }
      } catch (error) {
        console.error("Error:", error)
        showStatus("Error saving wake word", "error", "wakeWordStatus")
      }
    })
  }

  // Handle Speech Style form submission
  const speechStyleForm = document.getElementById("speechStyleForm")
  if (speechStyleForm) {
    console.log("got here")
    speechStyleForm.addEventListener("submit", async function (e) {
      e.preventDefault()
      const selectedStyle = document.querySelector('input[name="speechStyle"]:checked')?.value
      

      if (!selectedStyle) {
        showStatus("Please select a speech style", "error", "speechStyleStatus")
        return
      }

      try {
        const response = await fetch("/save_speech_style", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ speech_style: selectedStyle }),
        })

        if (response.ok) {
          showStatus("Speech style saved successfully!", "success", "speechStyleStatus")
        } else {
          const data = await response.json()
          showStatus("Failed to save speech style: " + data.error, "error", "speechStyleStatus")
        }
      } catch (error) {
        console.error("Error:", error)
        showStatus("Error saving speech style", "error", "speechStyleStatus")
      }
    })
  }
})

  

  async function fetchCurrentSpeechStyle() {
    try {
      const response = await fetch("/get_speech_style")
      const data = await response.json()
      if (data.speech_style) {
        const radio = document.querySelector(`input[name="speechStyle"][value="${data.speech_style}"]`)
        if (radio) radio.checked = true
      }
    } catch (error) {
      console.error("Error fetching speech style:", error)
    }
  }
  

document.addEventListener("DOMContentLoaded", loadFileList)

async function fetchCurrentVM() {
  try {
    const response = await fetch("/get_vm_config")
    const data = await response.json()

    const currentVMElement = document.getElementById("currentVM")
    if (data.vm_url) {
      currentVMElement.textContent = `Current VM URL: ${data.vm_url}`
      currentVMElement.style.display = "block"
    } else {
      currentVMElement.style.display = "none"
    }
  } catch (error) {
    console.error("Error fetching VM configuration:", error)
  }
}

async function fetchCurrentWiFi() {
  try {
    const response = await fetch("/get_wifi_config")
    const data = await response.json()

    const currentWiFiElement = document.getElementById("currentWiFi")
    if (data.ssid) {
      currentWiFiElement.textContent = `Current WiFi Network: ${data.ssid}`
      currentWiFiElement.style.display = "block"
    } else {
      currentWiFiElement.style.display = "none"
    }

    // Clear the input fields
    document.getElementById("ssid").value = ""
    document.getElementById("password").value = ""
  } catch (error) {
    console.error("Error fetching WiFi configuration:", error)
  }
}

async function fetchCurrentWakeWord() {
  try {
    const response = await fetch("/get_wake_word")
    const data = await response.json()

    const currentWakeWordElement = document.getElementById("currentWakeWord")
    if (data.wake_word) {
      currentWakeWordElement.textContent = `Current Wake Word: ${data.wake_word}`
      currentWakeWordElement.style.display = "block"
    } else {
      currentWakeWordElement.style.display = "none"
    }

    // Clear the input field
    document.getElementById("wakeWord").value = ""
  } catch (error) {
    console.error("Error fetching wake word configuration:", error)
  }
}




function showStatus(message, type, elementId) {
  const status = document.getElementById(elementId)
  if (status) {
    status.textContent = message
    status.className = `status ${
      type === "success" ? "status-success" : "status-error"
    }`
    status.style.display = "block"
    setTimeout(() => {
      status.style.display = "none"
    }, 3000)
  }
}

function uploadSong() {
  const input = document.getElementById("fileInput")
  const name = document.getElementById("songName").value
  if (!input.files[0]) {
    alert("Please select a file first.")
    return
  }
  if (!name) {
    alert("Please enter a name.")
    return
  }

  const data = new FormData()
  data.append("file", input.files[0])
  data.append("name", name)

  fetch("/add_song", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("status").innerText = result.message
      loadFileList()
    })
    .catch((error) => {
      document.getElementById("status").innerText = "Upload failed."
      console.error("Error:", error)
    })
}

function deleteSong(songName) {
  if (!confirm(`Are you sure you want to delete "${songName}"?`)) return

  fetch("/delete_song/" + encodeURIComponent(songName), { method: "DELETE" })
    .then((response) => response.json())
    .then((result) => {
      document.getElementById("status").innerText = result.message
      loadFileList()
    })
    .catch((error) => {
      document.getElementById("status").innerText = "Deletion failed."
      console.error("Error:", error)
    })
}

function loadFileList() {
  fetch("/get_song_names")
    .then((response) => response.json())
    .then((data) => {
      const fileList = document.getElementById("fileList")
      if(!fileList){
        return
      }
      fileList.innerHTML = "" // clear existing list
      console.log(data)

      if (data.song_names.length === 0) {
        fileList.innerHTML = "<li>No songs uploaded yet.</li>"
      } else {
        data.song_names.forEach((song) => {
          const li = document.createElement("li")
          li.style.display = "flex"
          li.style.alignItems = "center"

          const filenameSpan = document.createElement("span")
          filenameSpan.textContent = song

          const delButton = document.createElement("button")
          delButton.textContent = "X"
          delButton.className = "delete-button"
          delButton.onclick = () => deleteSong(song)

          li.appendChild(filenameSpan) // then filename
          li.appendChild(delButton) // Button first (left-justified)

          fileList.appendChild(li)
        })
      }
    })
    .catch((error) => console.error("Error:", error))
}
