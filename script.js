// script.js

document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
  
    // Check and apply stored theme preference
    const storedTheme = localStorage.getItem("theme");
  
    if (storedTheme === "dark") {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️"; // Moon switches to sun
    } else {
      themeToggle.textContent = "🌙"; // Ensure toggle shows correct icon
    }
  
    // Theme toggle button logic
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
  
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    });
  });
  