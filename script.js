document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navContainer = document.querySelector(".navbar");
    const body = document.body;
    const projectsItem = document.getElementById("projects");
    const subnav = document.getElementById("projects-subnav");
    const navLinks = document.querySelector(".nav-links");
    const pageContent = document.getElementById("pageContent");
  
    // 🔁 Unified close handler for nav
    const removeNav = () => {
      body.classList.remove("nav-open");
      body.classList.add("nav-closing");
  
      setTimeout(() => {
        body.classList.remove("nav-closing");
        document.documentElement.style.scrollPaddingTop = "64px";
      }, 300); // Match fadeSlideOut animation duration
    };
  
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
        body.classList.add("nav-open");
        document.documentElement.style.scrollPaddingTop = "160px";
      } else {
        removeNav();
      }
    });
  
    // --- Anchor click behavior (manual smooth scroll to avoid subnav glitch) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        const target = document.querySelector(href);
  
        if (target) {
          e.preventDefault();
  
          // Close mobile menu if open
          removeNav();
  
          // Scroll after short delay to allow DOM layout to stabilize
          setTimeout(() => {
            const offset = 110; // navbar + subnav height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
  
            window.scrollTo({
              top,
              behavior: "smooth"
            });
          }, 10);
        }
      });
    });
  
    // --- Close hamburger menu on click outside ---
    document.addEventListener("click", (event) => {
      const isMobile = window.innerWidth <= 768;
      const isOpen = body.classList.contains("nav-open");
      const clickedInsideNav = navContainer.contains(event.target);
  
      if (isMobile && isOpen && !clickedInsideNav) {
        removeNav();
      }
    });
  });
  