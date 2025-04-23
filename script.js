document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
  
    // Helper to apply theme and icon
    const applyTheme = (theme) => {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
      } else {
        body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
      }
    };
  
    // Load stored theme or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
  
    // Toggle theme on click
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  
    // 🔽 Dropdown hover logic for "Projects"
    const projectsItem = document.getElementById("projects");
    const subnav = document.getElementById("projects-subnav");
  
    // Show subnav on hover
    projectsItem.addEventListener("mouseenter", () => {
      subnav.classList.add("show-subnav");
    });
  
    // Hide subnav if mouse leaves both nav item and dropdown
    projectsItem.addEventListener("mouseleave", () => {
      setTimeout(() => {
        if (!subnav.matches(':hover')) {
          subnav.classList.remove("show-subnav");
        }
      }, 100);
    });
  
    subnav.addEventListener("mouseleave", () => {
      subnav.classList.remove("show-subnav");
    });
  });
  