document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navContainer = document.querySelector(".navbar");
    const body = document.body;
    const projectsItem = document.getElementById("projects");
    const subnav = document.getElementById("projects-subnav");
    const navLinks = document.querySelector(".nav-links");
    const pageContent = document.getElementById("pageContent");
  
    // --- Theme toggle logic ---
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
  
    // --- Hover dropdown logic (desktop only) ---
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
  
    // --- Hamburger open/close with blur + animation ---
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = body.classList.contains("nav-open");
  
      if (!isOpen) {
        // OPEN
        body.classList.add("nav-open");
        navLinks.classList.remove("closing");
        document.documentElement.style.scrollPaddingTop = "160px";
      } else {
        // CLOSE with animation
        navLinks.classList.add("closing");
  
        setTimeout(() => {
          body.classList.remove("nav-open");
          navLinks.classList.remove("closing");
          document.documentElement.style.scrollPaddingTop = "64px";
        }, 300); // must match fadeSlideOut CSS duration
      }
    });
  
    // --- Anchor click behavior (smooth scroll + close menu) ---
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
  
          // Close mobile nav if open
          body.classList.remove("nav-open");
          navLinks.classList.remove("closing");
          document.documentElement.style.scrollPaddingTop = "64px";
        }
      });
    });
  });
  