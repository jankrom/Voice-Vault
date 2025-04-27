import { useState, useEffect } from "react"

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home")

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "setup", "models", "privacy"]

      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          if (top <= 100 && bottom >= 100) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="bg-gray-900/90 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-800">
        <ul className="flex items-center gap-8">
          <li>
            <a
              href="#home"
              className={`text-sm font-medium transition-colors ${
                activeSection === "home"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`text-sm font-medium transition-colors ${
                activeSection === "about"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#setup"
              className={`text-sm font-medium transition-colors ${
                activeSection === "setup"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Setup
            </a>
          </li>
          <li>
            <a
              href="#models"
              className={`text-sm font-medium transition-colors ${
                activeSection === "models"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Models
            </a>
          </li>
          <li>
            <a
              href="#privacy"
              className={`text-sm font-medium transition-colors ${
                activeSection === "privacy"
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Privacy
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}