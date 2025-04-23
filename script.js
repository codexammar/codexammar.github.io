// script.js

// Theme toggle and persistence
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
  
    // Check stored preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    }
  
    // Theme toggle logic
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
  
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
      }
    });
  });
  