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
