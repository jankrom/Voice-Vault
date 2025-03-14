document.addEventListener("DOMContentLoaded", function () {
  // Load current VM configuration on page load
  fetchCurrentVM()

  // Handle form submission
  document
    .getElementById("vmForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault()

      const vmUrl = document.getElementById("vmUrl").value

      console.log("vmUrl", vmUrl)

      try {
        const response = await fetch("/save_vm_config", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vm_url: vmUrl }),
        })

        if (response.ok) {
          // Refresh the displayed VM configuration
          fetchCurrentVM()
          document.getElementById("vmUrl").value = ""
        } else {
          console.error("Failed to save VM configuration")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    })
})

document.addEventListener('DOMContentLoaded', loadFileList);

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

function uploadSong() {
  const input = document.getElementById('fileInput');
  const name = document.getElementById('songName').value;
  if (!input.files[0]) {
      alert("Please select a file first.");
      return;
  }
  if (!name) {
    alert("Please enter a name.");
    return;
  }

  const data = new FormData();
  data.append('file', input.files[0]);
  data.append('name', name)

  fetch('/add_song', {
      method: 'POST',
      body: data
  })
  .then(response => response.json())
  .then(result => {
      document.getElementById('status').innerText = result.message;
  })
  .catch(error => {
      document.getElementById('status').innerText = 'Upload failed.';
      console.error('Error:', error);
  });
}


function loadFileList() {
  fetch('/get_song_names')
  .then(response => response.json())
  .then(data => {
      const fileList = document.getElementById('fileList');
      fileList.innerHTML = ''; // clear existing list
      console.log(data)

      if (data.song_names.length === 0) {
          fileList.innerHTML = '<li>No files uploaded yet.</li>';
      } else {
          data.song_names.forEach(song => {
              const li = document.createElement('li');
              li.textContent = song;
              fileList.appendChild(li);
          });
      }
  })
  .catch(error => console.error('Error:', error));
}
