document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navContainer = document.querySelector(".navbar");
    const body = document.body;
    const projectsItem = document.getElementById("projects");
    const subnav = document.getElementById("projects-subnav");
  
    // Apply saved theme
    const applyTheme = (theme) => {
      if (theme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
      } else {
        body.classList.remove("dark-mode");
        themeToggle.textContent = "🌙";
      }
    };
  
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
  
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  
    // Desktop-only dropdown hover logic
    projectsItem.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        subnav.classList.add("show-subnav");
      }
    });
  
    projectsItem.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        setTimeout(() => {
          if (!subnav.matches(':hover')) {
            subnav.classList.remove("show-subnav");
          }
        }, 100);
      }
    });
  
    subnav.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        subnav.classList.remove("show-subnav");
      }
    });
  
    // Toggle hamburger nav + adjust scroll padding
    hamburgerBtn.addEventListener("click", () => {
      const navOpen = navContainer.classList.toggle("nav-open");
      document.documentElement.style.scrollPaddingTop = navOpen ? "160px" : "64px";
    });
  
    // Smooth scroll and close mobile menu on anchor clicks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          e.preventDefault();
          const navbarHeight = 64;
          const targetOffset = target.offsetTop - navbarHeight;
  
          window.scrollTo({
            top: targetOffset,
            behavior: "smooth"
          });
  
          // Close mobile menu
          navContainer.classList.remove("nav-open");
          document.documentElement.style.scrollPaddingTop = "64px";
        }
      });
    });
  });
  