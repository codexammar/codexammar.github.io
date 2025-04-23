document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
  
    // 1. Load the stored theme from localStorage
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      themeToggle.textContent = "☀️";
    } else {
      body.classList.remove("dark-mode");
      themeToggle.textContent = "🌙";
    }
  
    // 2. Toggle the theme and update icon/storage
    themeToggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      themeToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  });
  